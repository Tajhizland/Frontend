//@ts-nocheck
"use client";
import React, {useRef, useEffect, useState} from "react";
import {useInfiniteQuery} from "react-query";
import {getVlogByCategoryPaginated, getVlogPaginated} from "@/services/api/shop/vlog";
import {VlogResponse} from "@/services/types/vlog";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import {FaEye} from "react-icons/fa";
import VlogFilter from "@/components/Vlog/VlogFilter";
import WidgetFilter from "../Vlog/WidgetFilter";
import {Route} from "next";
import VlogCardSkeleton from "@/components/Skeleton/VlogCardSkeleton";
import {FaCirclePlay} from "react-icons/fa6";
import VlogMiniPost from "@/components/Vlog/VlogMiniPost";
import Image from "next/image";
import {useRouter} from "next/navigation";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";
import {GoEye} from "react-icons/go";

export default function VlogCategoryListing({response, search, url}: { response: any, search?: string, url: string }) {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [filter, setFilter] = useState<string>(search ? ("filter[search]=" + search) : "");
    const [page, setPage] = useState<number>(1);

    // استفاده از useInfiniteQuery برای بارگذاری داده‌ها به صورت بی‌پایان
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(
        ["vlogs", filter], // فیلترها را در queryKey ارسال می‌کنیم
        async ({pageParam = 1, queryKey}) => {
            const filters = queryKey[1]; // دریافت فیلترها از queryKey
            const result = await getVlogByCategoryPaginated(url, pageParam, filters);
            return result.listing;
        },
        {
            initialData: {
                pages: [response.listing],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) =>
                //@ts-ignore
                lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    //@ts-ignore
                    ? lastPage?.meta?.current_page + 1
                    : undefined,
            refetchOnWindowFocus: false,
        }
    );

    // استفاده از IntersectionObserver برای بارگذاری صفحه بعدی
    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                    setPage((prevPage) => prevPage + 1);

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

    useEffect(() => {
        if (page > 1) {
            router.replace(`?page=${page}`, {scroll: false});
        }
    }, [page, router]);

    const allVlogs = data?.pages.flatMap((page) => page.data) || [];

    const renderItem = (item: VlogResponse) => (
        <div className="w-full h-full  overflow-hidden   bg-white dark:bg-transparent" key={item.id}>
            <Link
                href={"/vlog/" + item.url as Route}
                aria-label={"vlog"}
                className="flex flex-col"
            >
                <div className="relative rounded-xl overflow-hidden group">

                    <NcImage
                        containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.poster}`}
                        className="object-cover w-full h-full "
                        fill
                        alt="vlog"
                    />
                    <div
                        className="absolute top-0 left-0 bg-black/70 w-full h-full group-hover:flex justify-center items-center hidden">
                        <FaCirclePlay className="text-white w-8 h-8 animate-pulse"/>
                    </div>
                </div>
                <span className="py-2.5 px-2 dark:text-white text-xs sm:text-sm">{item.title}</span>
                <div className="flex justify-between items-center  px-2 text-neutral-500 dark:text-white">
                    <div className="flex items-center gap-x-2">
                        <GoEye/>
                        <span className={"text-xs sm:text-sm"}>{item.view}</span>
                    </div>
                    <span className="text-xs">{item.created_at}</span>
                </div>
            </Link>
        </div>
    );

    const handleFilterChange = (filters: string) => {
        setFilter(filters); // فیلتر را در state تغییر می‌دهیم
        setPage(1)
    };

    return (
        <div className="nc-PageCollection dark:bg-neutral-900">
                 <div className="container py-5 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                     <div className="space-y-5 lg:space-y-5">
                    <SectionSingleBanner banner={response.banner.data[0]}/>

                    <main>
                        {/* TABS FILTER */}
                        <VlogFilter changeFilter={handleFilterChange} defualtSearch={search} hasFilter={false}/>
                        {/* LOOP ITEMS */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 mt-8 lg:mt-10 gap-10">
                            <div className="hidden lg:block lg:col-span-3">
                                <div className={"flex flex-col gap-10"}>
                                    <VlogMiniPost vlogs={response.mostViewed.data}/>
                                </div>
                            </div>

                            <div
                                className="  lg:col-span-9  ">
                                <div
                                    className="grid   grid-cols-2 lg:grid-cols-3 gap-2 gap-y-7 sm:gap-5 sm:gap-y-7">
                                    {allVlogs.map((item: VlogResponse) => renderItem(item))}
                                </div>
                                <div ref={lastElementRef}
                                     className="grid   grid-cols-2 lg:grid-cols-3  gap-2 gap-y-7 sm:gap-5 sm:gap-y-7 mt-7">
                                    {isFetchingNextPage && <VlogCardSkeleton/>}
                                </div>
                            </div>
                        </div>

                        {/* Infinite Scroll Loader */}

                    </main>
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                            {response.category.name}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
