"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

type Options = {
    minLength?: number;
    delay?: number;
    staleTime?: number;
};

export const useSearchQuery = <T,>(
    key: string,
    searchFn: (query: string) => Promise<T>,
    { minLength = 1, delay = 350, staleTime = 5000 }: Options = {}
) => {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebouncedValue(query, delay);
    const enabled = debouncedQuery.trim().length >= minLength;

    const { data, isFetching, isSuccess } = useQuery({
        queryKey: [key, debouncedQuery],
        queryFn: () => searchFn(debouncedQuery.trim()),
        enabled,
        staleTime,
    });

    return {
        query,
        setQuery,
        results: enabled ? data : undefined,
        isSearching: isFetching,
        isSuccess: enabled && isSuccess,
        clear: () => setQuery(""),
    };
};
