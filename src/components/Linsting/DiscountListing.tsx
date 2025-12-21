//@ts-nocheck
"use client";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {getDiscountedProducts} from "@/services/api/shop/product";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import {useInfiniteQuery} from "react-query";
import ProductCard from "@/components/Card/ProductCard";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";
import SectionNewDiscountSlider from "@/components/Section/SectionNewDiscountSlider";
import CategoryCircleCard from "@/components/Card/CategoryCircleCard";
import {CgSwap} from "react-icons/cg";
import Link from "next/link";
import {Route} from "next";
import Image from "next/image";

const DiscountListing = ({response}: { response }) => {
    const router = useRouter();
    const [filter, setFilter] = useState<number>();


    // استفاده از useInfiniteQuery برای بارگذاری داده‌ها
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery(
        ["discountedProducts", filter],
        async ({pageParam = 1}) => {
            const result = await getDiscountedProducts(pageParam, filter ? `filter[category]=${filter}` : ""); // فراخوانی getDiscountedProducts به صورت صفحه‌بندی شده
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
            <div className="container space-y-10 lg:space-y-14">

                {(response.campaign && response.campaign.banner) ?
                    <div
                        className={`relative w-full   rounded-2xl overflow-hidden group border aspect-w-2 sm:aspect-w-3 lg:aspect-w-4 aspect-h-1`}
                    >
                        <div>
                            <Image
                                alt=""
                                fill
                                className="w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/campaign/${response.campaign.banner}`}
                            />
                        </div>

                    </div>
                    :
                    <SectionSingleBanner banner={response.banner.data[0]}/>
                }
            </div>
            <hr className="border-slate-200 dark:border-slate-700 mt-10 lg:mt-14"/>

            <div
                className="container  my-5 sm:my-10 px-5  lg:px-0  relative overflow-hidden">
                <SectionNewDiscountSlider
                    campaign={response.campaign}
                    timer={response?.discountTimer?.discount_expire_time}
                    data={response.topDiscountedProducts?.data || []}
                    subHeading={""}
                />
                <div
                    style={{backgroundColor: response.campaign ? response.campaign.background_color : "#fcb415"}}
                    className="absolute w-24 h-24  rounded-full -left-[4rem] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
                    <div className="w-20 h-20 bg-white rounded-full"></div>
                </div>


            </div>
            <hr/>

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
            <hr/>
            <div className="container space-y-10 lg:space-y-14">


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
