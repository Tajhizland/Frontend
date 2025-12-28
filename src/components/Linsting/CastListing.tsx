//@ts-nocheck
"use client";
import React, { useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import VlogCardSkeleton from "@/components/Skeleton/VlogCardSkeleton";
import { useRouter } from "next/navigation";
import {paginatedCast} from "@/services/api/shop/cast";
import CastCard from "@/components/Card/CastCard";
import {CastResponse} from "@/services/types/cast";
import CastMiniPost from "@/components/Cast/CastMiniPost";
import WidgetFilter from "@/components/Cast/WidgetFilter";
import CastFilter from "@/components/Cast/CastFilter";

export default function CastListing({ response, search }: { response: any, search?: string }) {
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
        ["casts", filter], // فیلترها را در queryKey ارسال می‌کنیم
        async ({ pageParam = 1, queryKey }) => {
            const filters = queryKey[1]; // دریافت فیلترها از queryKey
            const result = await paginatedCast(pageParam, filters);
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
            router.replace(`?page=${page}`, { scroll: false });
        }
    }, [page, router]);

    const allCasts = data?.pages.flatMap((page) => page.data) || [];

    const handleFilterChange = (filters: string) => {
        setFilter(filters); // فیلتر را در state تغییر می‌دهیم
        setPage(1)
    };

    return (
        <div className="nc-PageCollection dark:bg-neutral-900">
            <div className="container py-5 lg:pb-28   space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-5 lg:space-y-5">
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
                                <div  ref={lastElementRef} className={"flex flex-col gap-10"}>

                                {isFetchingNextPage && <VlogCardSkeleton />}
                                </div>
                            </div>
                        </div>

                        {/* Infinite Scroll Loader */}

                    </main>
                </div>
            </div>
        </div>
    );
}
