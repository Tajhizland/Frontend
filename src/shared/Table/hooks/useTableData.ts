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
};

export const useTableData = <T,>({ fetchFn, baseKey, initialFilters, defaultSort, debounce }: Options<T>) => {
    const queryClient = useQueryClient();

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<Record<string, any>>(initialFilters ?? {});
    const [debouncedFilters, setDebouncedFilters] = useState(filters);
    const [filterEpoch, setFilterEpoch] = useState(0);
    const [sort, setSort] = useState<{ key: string | null; direction: "asc" | "desc" }>({
        key: defaultSort?.key ?? null,
        direction: defaultSort?.direction ?? "asc",
    });

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedFilters(filters), debounce);
        return () => clearTimeout(timer);
    }, [filters, debounce]);

    useEffect(() => {
        setPage(1);
    }, [debouncedFilters, sort]);

    const sortParam = sort.key ? `${sort.direction === "asc" ? "" : "-"}${sort.key}` : undefined;

    const queryKey = useMemo(
        () => [...baseKey, page, sortParam ?? "", debouncedFilters],
        [baseKey, page, sortParam, debouncedFilters]
    );

    const { data, isLoading, isFetching, refetch } = useQuery<TableResult<T>>({
        queryKey,
        queryFn: () => fetchFn({ page, sort: sortParam, filters: debouncedFilters }),
        // v5 replaced `keepPreviousData: true` with the placeholderData helper
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });

    const invalidate = () => queryClient.invalidateQueries({ queryKey: baseKey });

    const toggleSort = (key: string) =>
        setSort((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));

    const setFilter = (key: string, value: any) => setFilters((prev) => ({ ...prev, [key]: value }));

    const resetFilters = () => {
        setFilters({});
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
        isLoading: isLoading || isFetching,
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
