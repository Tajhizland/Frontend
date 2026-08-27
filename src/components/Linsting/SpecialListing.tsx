"use client"
import React, { useEffect, useRef } from "react";
import {SpecialProductPageResponse} from "@/services/types/product";
import { useRouter } from "next/navigation";
import { getSpecialProductsPaginate } from "@/services/api/shop/product";
import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductResponse } from "@/services/types/product";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import ProductCard from "@/components/Card/ProductCard";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

export default function SpecialListing({ response }: { response: SpecialProductPageResponse }) {
    const router = useRouter();

    // استفاده از useInfiniteQuery برای بارگذاری داده‌ها
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["specialProducts"],
        queryFn: // شناسه کوئری
        async ({ pageParam }) => {
            const result = await getSpecialProductsPaginate(pageParam);
            return result.data;
        },
        initialPageParam: 1,
        initialData: {
                pages: [response.data],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) => {
                return lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    ? lastPage?.meta?.current_page + 1
                    : undefined;
            },
    });

    const sentinelRef = useInfiniteScroll({hasNextPage, isFetchingNextPage, fetchNextPage});

    // به‌روزرسانی URL با تغییر صفحه
    useEffect(() => {
        if (data) {
            const currentPage = data.pages[data.pages.length - 1]?.meta?.current_page;
            if (currentPage) {
                router.replace(`?page=${currentPage}`, { scroll: false });
            }
        }
    }, [data, router]);

    const allProducts = data?.pages.flatMap((page) => page.data) || [];
     return (
        <>
            <div className={`nc-PageCollection dark:bg-neutral-900`}>
                <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                    <div className="space-y-10 lg:space-y-14">
                        {/* HEADING */}
                        <SectionSingleBanner banner={response.banner.data[0]} />
                        <hr className="border-slate-200 dark:border-slate-700" />

                        <main>
                            {/* LOOP ITEMS */}
                            <div
                                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                                {allProducts.map((item: ProductResponse, index: number) => (
                                    <ProductCard data={item} key={index}/>
                                ))}
                            </div>

                            {/* آخرین عنصر برای مشاهده صفحه بعد */}
                            <div ref={sentinelRef}
                                 className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                                {isFetchingNextPage && <ProductCardSkeleton/>}
                            </div>
                        </main>
                        <hr className="border-slate-200 dark:border-slate-700" />
                        <div className="max-w-[var(--breakpoint-sm)]">
                            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                                محصولات خاص پسند ها
                            </h2>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
