"use client";
import React, { useRef, useEffect, useState } from "react";
import SectionPromo1 from "@/components/SectionPromo1";
import TabFilters from "@/components/TabFilters";
import { findCategoryByUrl } from "@/services/api/shop/category";
import ProductCardNew from "@/components/ProductCardNew";
import { useRouter } from "next/navigation";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import { useInfiniteQuery } from "react-query";

const PageCollection = ({ response, url }: { response: any, url: string }) => {
    const router = useRouter();
    const [filter, setFilter] = useState<string>("");
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState<number>(1);  // مدیریت صفحه

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery(
        ["categoryProducts", url, filter],
        async ({ pageParam = 1 }) => {
            const result = await findCategoryByUrl(url, filter, pageParam);
            return result;
        },
        {
            initialData: {
                pages: [response],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) =>
                lastPage?.products?.meta?.current_page <
                lastPage?.products?.meta?.last_page
                    ? lastPage?.products?.meta?.current_page + 1
                    : undefined,
        }
    );

    // هنگام تغییر فیلتر، داده‌ها را مجدداً بارگذاری می‌کنیم
    const handleFilterChange = async (newFilter: string) => {
        setFilter(newFilter);
        setPage(1);  // Reset to first page when filter changes
        await refetch();
    };

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                    setPage((prevPage) => prevPage + 1);  // Update the page state
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

    // هر بار که صفحه تغییر می‌کند، URL را به‌روز می‌کنیم
    useEffect(() => {
        if (page > 1) {
            router.replace(`?page=${page}`, { scroll: false });
        }
    }, [page, router]);

    const allProducts = data?.pages.flatMap((page) => page.products.data) || [];

    return (
        <div className={`nc-PageCollection dark:bg-neutral-900`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                            {response.category.name}
                        </h2>
                        <span className="block mt-4 text-neutral-500 text-sm sm:text-base dark:text-white">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: response.category.description,
                                }}
                            />
                        </span>
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700" />

                    <main>
                        {/* TABS FILTER */}
                        <TabFilters
                            filters={response.category.filters.data}
                            maxPrice={response.category.maxPrice}
                            minPrice={response.category.minPrice}
                            changeFilter={handleFilterChange}
                        />

                        {/* LOOP ITEMS */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                            {allProducts.map((item, index) => (
                                <ProductCardNew data={item} key={index} />
                            ))}
                        </div>

                        <div ref={lastElementRef}
                             className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                            {isFetchingNextPage && <ProductCardSkeleton />}
                        </div>
                    </main>
                </div>

                <hr className="border-slate-200 dark:border-slate-700" />

                <SectionPromo1 />
            </div>
        </div>
    );
};

export default PageCollection;
