"use client";
import ProductCard2 from "@/components/ProductCard";
import {useInfiniteQuery} from "react-query";
import {getFavorite} from "@/services/api/shop/favorite";
import React, {useRef, useEffect} from "react";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";

const AccountSavelists = () => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery(
        ["get_favorite"],
        async ({pageParam = 1}) => {
            const result = await getFavorite(pageParam);
            return result;
        },
        {
            //@ts-ignore
            getNextPageParam: (lastPage) =>
                //@ts-ignore
                lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    //@ts-ignore
                    ? lastPage?.meta?.current_page + 1
                    : undefined,
        }
    );

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: "200px",
            }
        );

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allFavorites = data?.pages.flatMap((page) => page.data) || [];

    return (
        <div className="space-y-10 sm:space-y-12 dark:text-white">
            <div>
            </div>

            <div className="grid grid-cols-2 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {allFavorites.map((item) => (
                    <ProductCard2 key={item.id} data={item} />
                ))}
            </div>

            <div ref={lastElementRef}
                 className="grid sm:grid-cols-2 lg:grid-cols-3  gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                {isFetchingNextPage && <ProductCardSkeleton/>}
            </div>
        </div>
    );
};

export default AccountSavelists;
