"use client";

import { useEffect, useRef } from "react";

type Options = {
    hasNextPage?: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => unknown;
    rootMargin?: string;
};

export const useInfiniteScroll = ({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin = "500px",
}: Options) => {
    const sentinelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = sentinelRef.current;
        if (!element || !hasNextPage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) fetchNextPage();
            },
            { rootMargin }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin]);

    return sentinelRef;
};
