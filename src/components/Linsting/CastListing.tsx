"use client";
import ShopPagination from "@/shared/Pagination/ShopPagination";
import React, { useRef, useEffect, useState } from "react";
import {CastListingResponse} from "@/services/types/cast";
import { useInfiniteQuery } from "@tanstack/react-query";
import VlogCardSkeleton from "@/components/Skeleton/VlogCardSkeleton";
import {paginatedCast} from "@/services/api/shop/cast";
import CastCard from "@/components/Card/CastCard";
import {CastResponse} from "@/services/types/cast";
import CastMiniPost from "@/components/Cast/CastMiniPost";
import WidgetFilter from "@/components/Cast/WidgetFilter";
import CastFilter from "@/components/Cast/CastFilter";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";
import LogoIco from "@/images/logoTajhizcast.jpg";
import Image from "next/image";
import Logo from "@/shared/Logo/Logo";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

export default function CastListing({ response, search }: { response: CastListingResponse, search?: string }) {
    const [filter, setFilter] = useState<string>(search ? new URLSearchParams({"filter[search]": search}).toString() : "");

    // استفاده از useInfiniteQuery برای بارگذاری داده‌ها به صورت بی‌پایان
    const initialPage = response.listing.meta?.current_page || 1;
    const initialFilter = search ? new URLSearchParams({"filter[search]": search}).toString() : "";
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["casts", filter, initialPage],
        queryFn: // فیلترها را در queryKey ارسال می‌کنیم
        async ({ pageParam, queryKey }) => {
            const filters = filter; // دریافت فیلترها از queryKey
            const result = await paginatedCast(pageParam, filters);
            return result.listing;
        },
        initialPageParam: (filter === initialFilter ? initialPage : 1),
        initialData: filter === initialFilter ? {
                pages: [response.listing],
                pageParams: [initialPage],
            } : undefined,
            getNextPageParam: (lastPage) =>
                //@ts-ignore
                lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    //@ts-ignore
                    ? lastPage?.meta?.current_page + 1
                    : undefined,
            refetchOnWindowFocus: false,
    });

    const sentinelRef = useInfiniteScroll({hasNextPage, isFetchingNextPage, fetchNextPage});



    const allCasts = data?.pages.flatMap((page) => page.data) || [];

    const handleFilterChange = (filters: string) => {
        setFilter(filters); // فیلتر را در state تغییر می‌دهیم

    };

    return (
        <div className="nc-PageCollection dark:bg-neutral-900">
            <div className="container py-5 lg:pb-28   space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-5 lg:space-y-5">
                    {response.banner?.data?.length > 0 &&
                        <div className="mt-5 lg:mt-10 relative">

                            <SectionSingleBanner
                                w="aspect-w-3 sm:aspect-w-4 lg:aspect-w-5"
                                h="aspect-h-1"
                                banner={response.banner.data[0]}
                            />

                            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50">
                                <Image
                                    className="w-20 h-20"
                                    src={LogoIco}
                                    alt="Logo"
                                    priority
                                />
                            </div>
                        </div>
                    }
                        <h1 className="text-2xl font-bold">تجهیزکست؛ پادکست تجهیزلند</h1>
                        <main>
                        {/* TABS FILTER */}
                        <CastFilter   changeFilter={handleFilterChange} defualtSearch={search} />
                        {/* LOOP ITEMS */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 lg:mt-10 gap-10">
                            <div className="hidden lg:block lg:col-span-3">
                                <div className={"flex flex-col gap-10"}>
                                    <WidgetFilter categoryList={response.category.data} changeFilter={handleFilterChange} />
                                    <CastMiniPost casts={response.mostViewed.data} />
                                </div>
                            </div>

                            <div
                                className="  lg:col-span-9  ">
                                <div className={"flex flex-col gap-10"}>

                                {allCasts.map((item: CastResponse) => <CastCard cast={item} key={item.id}/>)}
                                </div>
                                <div  ref={sentinelRef} className={"flex flex-col gap-10"}>

                                {isFetchingNextPage && <VlogCardSkeleton />}
                                </div>
                            </div>
                        </div>

                        {/* Infinite Scroll Loader */}


                        {!filter && <ShopPagination currentPage={initialPage} totalPages={response.listing.meta?.last_page || 1} url={"/tajhizcast"} />}
                    </main>
                </div>
            </div>
        </div>
    );
}
