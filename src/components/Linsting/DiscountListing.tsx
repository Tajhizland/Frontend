//@ts-nocheck
"use client";
import React, {useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import {getDiscountedProducts} from "@/services/api/shop/product";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import {useInfiniteQuery} from "react-query";
import ProductCard from "@/components/Card/ProductCard";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";

const DiscountListing = ({response}: { response }) => {
    const router = useRouter();


    // استفاده از useInfiniteQuery برای بارگذاری داده‌ها
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery(
        ["discountedProducts"],
        async ({pageParam = 1}) => {
            const result = await getDiscountedProducts(pageParam); // فراخوانی getDiscountedProducts به صورت صفحه‌بندی شده
            return result.data;
        },
        {
            // داده‌های اولیه از props
            initialData: {
                pages: [response.data],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) =>
                lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    ? lastPage?.meta?.current_page + 1
                    : undefined,
        }
    );

    // برای مشاهده صفحه جدید به صورت خودکار زمانی که به انتهای صفحه رسید
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage(); // بارگذاری صفحه بعدی
                }
            },
            {
                rootMargin: "500px", // فاصله که قبل از رسیدن به انتهای صفحه بارگذاری شروع شود
            }
        );

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        if (data) {
            const currentPage = data.pages[data.pages.length - 1]?.meta?.current_page;
            if (currentPage) {
                router.push(`?page=${currentPage}`, {scroll: false});
            }
        }
    }, [data, router]);
    const allProducts = data?.pages.flatMap((page) => page.data) || [];

    return (
        <div className={`nc-PageSearch dark:bg-neutral-900 py-16 lg:pb-28 lg:pt-20 `} data-nc-id="PageSearch">
            <div className="container space-y-10 lg:space-y-14">
                <SectionSingleBanner banner={response.banner.data[0]}/>
                <hr className="border-slate-200 dark:border-slate-700"/>
                <div className="  space-y-16 lg:space-y-28">
                    <main>
                        {/* LOOP ITEMS */}
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {allProducts.map((item, index) => (
                                <ProductCard data={item} key={index}/>
                            ))}
                        </div>

                        {/* Loading more products indicator */}
                        <div ref={lastElementRef}
                             className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {isFetchingNextPage && <ProductCardSkeleton/>}
                        </div>
                    </main>
                    <hr className="border-slate-200 dark:border-slate-700"/>

                    <div className="container">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                            تخفیفی های تجهیزلند
                        </h2>
                        <span className="block mt-4 text-neutral-500 dark:text-white text-sm sm:text-base">
                    تمام محصولات تخفیفی تجهیزلند رو میتونید در این صفحه مشاهده کنید
                </span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DiscountListing;
