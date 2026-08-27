"use client";
import React, {useEffect, useRef, useState} from "react";
import {StockProductPageResponse} from "@/services/types/product";
import {useRouter} from "next/navigation";
import {getStockProductsPaginate} from "@/services/api/shop/product";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import {useInfiniteQuery} from "@tanstack/react-query";
import ProductCard from "@/components/Card/ProductCard";
import CategoryCircleCard from "@/components/Card/CategoryCircleCard";
import {CgSwap} from "react-icons/cg";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

const StockListing = ({response}: {response: StockProductPageResponse}) => {
    const router = useRouter();
    const [filter, setFilter] = useState<number>();


    // استفاده از useInfiniteQuery برای بارگذاری داده‌ها
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["stock-products", filter],
        queryFn: async ({pageParam}) => {
            const result = await getStockProductsPaginate(pageParam, filter ? `filter[category]=${filter}` : ""); // فراخوانی getDiscountedProducts به صورت صفحه‌بندی شده
            return result.data;
        },
        initialPageParam: 1,
        // داده‌های اولیه از props
            initialData: {
                pages: [response.data],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) =>
                lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    ? lastPage?.meta?.current_page + 1
                    : undefined,
    });

    const sentinelRef = useInfiniteScroll({hasNextPage, isFetchingNextPage, fetchNextPage});

    useEffect(() => {
        if (data) {
            const currentPage = data.pages[data.pages.length - 1]?.meta?.current_page;
            if (currentPage) {
                router.replace(`?page=${currentPage}`, {scroll: false});
            }
        }
    }, [data, router]);
    const allProducts = data?.pages.flatMap((page) => page.data) || [];

    const changeFilter = async (value: number) => {
        if (filter === value) {
            setFilter(undefined);
            await fetchNextPage(); // Reset filter
        } else {
            setFilter(value);
            await fetchNextPage(); // Apply new filter
        }
    };
    return (
        <div className={`nc-PageSearch dark:bg-neutral-900 py-16 lg:pb-28 lg:pt-20 `} data-nc-id="PageSearch">

            <div className="flex flex-col">
                <div
                    className="container p-0 flex overflow-x-auto lg:justify-items-center lg:items-center lg:gap-5 text-center">
                    {
                        response?.category?.data?.map((item, index) => (
                            <CategoryCircleCard
                                category={item}
                                active={item.id === filter}
                                key={index}
                                onClick={() => changeFilter(item.id)}/>
                        ))
                    }
                </div>
                <div className={"flex justify-center border-b lg:hidden"}>
                    <CgSwap className={" w-8 h-8 text-neutral-400"}/>
                </div>
            </div>

            <div className="container space-y-10 lg:space-y-14">
                <div className="  space-y-16  ">
                    <main>
                        {/* LOOP ITEMS */}
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {allProducts.map((item, index) => (
                                <ProductCard data={item} key={index}/>
                            ))}
                        </div>

                        {/* Loading more products indicator */}
                        <div ref={sentinelRef}
                             className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {isFetchingNextPage && <ProductCardSkeleton/>}
                        </div>
                    </main>
                    <hr className="border-slate-200 dark:border-slate-700"/>

                    <div className="container">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                            محصولات دست دوم تجهیزلند
                        </h2>
                        <span className="block mt-4 text-neutral-500 dark:text-white text-sm sm:text-base">
                            تمام محصولات دست دوم تجهیزلند رو میتونید در این صفحه مشاهده کنید
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StockListing;
