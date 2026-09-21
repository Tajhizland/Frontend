"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient, keepPreviousData} from "@tanstack/react-query";
import { TableFetcher, TableMeta, TableResult } from "@/shared/Table/types";

type Options<T> = {
    fetchFn: TableFetcher<T>;
    baseKey: unknown[];
    initialFilters?: Record<string, any>;
    defaultSort?: { key: string; direction?: "asc" | "desc" };
    debounce: number;
    storageKey?: string;
};

type TableState = {
    page: number;
    filters: Record<string, any>;
    sort: { key: string | null; direction: "asc" | "desc" };
};

const readState = (storageKey: string, fallback: TableState): TableState => {
    try {
        const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null");
        if (
            saved && Number.isSafeInteger(saved.page) && saved.page > 0 &&
            saved.filters && typeof saved.filters === "object" && !Array.isArray(saved.filters) &&
            saved.sort && (saved.sort.key === null || typeof saved.sort.key === "string") &&
            (saved.sort.direction === "asc" || saved.sort.direction === "desc")
        ) {
            return { page: saved.page, filters: saved.filters, sort: saved.sort };
        }
    } catch {
        // Storage can be unavailable or contain data from an older version.
    }
    return fallback;
};

export const useTableData = <T,>({ fetchFn, baseKey, initialFilters, defaultSort, debounce, storageKey }: Options<T>) => {
    const queryClient = useQueryClient();

    const [defaults] = useState<TableState>(() => ({
        page: 1,
        filters: initialFilters ?? {},
        sort: { key: defaultSort?.key ?? "id", direction: defaultSort?.direction ?? "desc" },
    }));
    const [state, setState] = useState(() => ({
        ...defaults,
        debouncedFilters: defaults.filters,
        restoredKey: undefined as string | undefined,
    }));
    const { page, filters, debouncedFilters, sort } = state;
    const ready = state.restoredKey === storageKey;
    const [filterEpoch, setFilterEpoch] = useState(0);

    // Restore before enabling the query so returning to a list never requests page 1 first.
    useEffect(() => {
        const saved = storageKey ? readState(storageKey, defaults) : defaults;
        // Browser storage is external state and must be read after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({ ...saved, debouncedFilters: saved.filters, restoredKey: storageKey });
    }, [storageKey, defaults]);

    useEffect(() => {
        if (!ready || filters === debouncedFilters) return;
        const timer = setTimeout(() => {
            setState((prev) => ({ ...prev, page: 1, debouncedFilters: prev.filters }));
        }, debounce);
        return () => clearTimeout(timer);
    }, [filters, debouncedFilters, debounce, ready]);

    useEffect(() => {
        if (!ready || !storageKey) return;
        try {
            sessionStorage.setItem(storageKey, JSON.stringify({
                // Preserve newly typed filters even when navigating before the debounce ends.
                page: filters === debouncedFilters ? page : 1,
                filters,
                sort,
            }));
        } catch {
            // Keep the table usable when browser storage is disabled or full.
        }
    }, [storageKey, ready, page, filters, debouncedFilters, sort]);

    const sortParam = sort.key ? `${sort.direction === "asc" ? "" : "-"}${sort.key}` : undefined;

    const queryKey = useMemo(
        () => [...baseKey, page, sortParam ?? "", debouncedFilters],
        [baseKey, page, sortParam, debouncedFilters]
    );

    const { data, isLoading, isFetching, refetch } = useQuery<TableResult<T>>({
        queryKey,
        queryFn: () => fetchFn({ page, sort: sortParam, filters: debouncedFilters }),
        enabled: ready,
        // v5 replaced `keepPreviousData: true` with the placeholderData helper
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });

    const invalidate = () => queryClient.invalidateQueries({ queryKey: baseKey });

    // اولین کلیک روی یک ستون نزولی مرتب می‌کند (تازه‌ترین/بزرگ‌ترین اول).
    const toggleSort = (key: string) =>
        setState((prev) => ({
            ...prev,
            page: 1,
            sort: {
                key,
                direction: prev.sort.key === key && prev.sort.direction === "desc" ? "asc" : "desc",
            },
        }));

    const setPage = (page: number) => setState((prev) => ({ ...prev, page }));

    const setFilter = (key: string, value: any) => setState((prev) => ({
        ...prev,
        filters: { ...prev.filters, [key]: value },
    }));

    const resetFilters = () => {
        const emptyFilters = {};
        setState((prev) => ({ ...prev, page: 1, filters: emptyFilters, debouncedFilters: emptyFilters }));
        setFilterEpoch((epoch) => epoch + 1);
    };

    const hasActiveFilters = Object.values(filters).some((value) => value !== "" && value != null);

    const meta: Partial<TableMeta> = data?.meta ?? {};
    const totalPages = meta.total && meta.per_page ? Math.ceil(meta.total / meta.per_page) : 0;

    return {
        rows: data?.data ?? [],
        meta,
        totalPages,
        page,
        setPage,
        isLoading: !ready || isLoading || isFetching,
        refetch,
        invalidate,
        sort,
        toggleSort,
        filters,
        setFilter,
        resetFilters,
        filterEpoch,
        hasActiveFilters,
    };
};
