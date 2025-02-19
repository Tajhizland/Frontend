//@ts-nocheck
"use client"
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSpecialProductsPaginate } from "@/services/api/shop/product";
import { useInfiniteQuery } from "react-query";
import { ProductResponse } from "@/services/types/product";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import ProductCard from "@/components/Card/ProductCard";

export default function SpecialListing({ response }) {
    const router = useRouter();
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);

    // استفاده از useInfiniteQuery برای بارگذاری داده‌ها
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
    } = useInfiniteQuery(
        "specialProducts",  // شناسه کوئری
        async ({ pageParam = 1 }) => {
            const result = await getSpecialProductsPaginate(pageParam);
            return result;
        },
        {
            initialData: {
                pages: [response],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) => {
                return lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    ? lastPage?.meta?.current_page + 1
                    : undefined;
            },
        }
    );

    // استفاده از IntersectionObserver برای بارگذاری صفحه بعد
    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();  // صفحه بعدی را بارگذاری می‌کند
                }
            },
            {
                rootMargin: "500px",
            }
        );

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    // به‌روزرسانی URL با تغییر صفحه
    useEffect(() => {
        if (data) {
            const currentPage = data.pages[data.pages.length - 1]?.meta?.current_page;
            if (currentPage) {
                router.push(`?page=${currentPage}`, { scroll: false });
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
                        <div className="max-w-screen-sm">
                            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                                محصولات خاص پسند ها
                            </h2>
                        </div>

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
                            <div ref={lastElementRef}
                                 className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                                {isFetchingNextPage && <ProductCardSkeleton/>}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
