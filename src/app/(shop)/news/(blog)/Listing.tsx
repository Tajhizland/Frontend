"use client";

import React, { useRef, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { getNewsPaginated } from "@/services/api/shop/news";
import Heading from "@/components/Heading/Heading";
import Card3 from "./Card3";
import { NewsResponse } from "@/services/types/news";
import { useRouter } from "next/navigation";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import BlogCardSkeleton from "@/components/Skeleton/BlogCardSkeleton";

const Listing = ({ response }: { response: NewsResponse[] }) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isSuccess,
    } = useInfiniteQuery(
        "news",
        async ({ pageParam = 1 }) => {
            const result = await getNewsPaginated(pageParam);
            return result;
        },
        {
            initialData: {
                pages: [{ data: response }], // مقدار اولیه داده‌ها
                pageParams: [1], // پارامتر صفحه اولیه
            },
            getNextPageParam: (lastPage) =>
                //@ts-ignore
                lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    //@ts-ignore
                    ? lastPage?.meta?.current_page + 1
                    : undefined,
        }
    );

    // استفاده از useEffect برای جلوگیری از اسکرول بالا هنگام تغییر صفحه
    useEffect(() => {
        //@ts-ignore
        if (data?.pages.length > 1) {
            // وقتی که صفحه تغییر می‌کند، URL به‌روز می‌شود و پارامتر صفحه تغییر می‌کند
            router.replace(`?page=${data?.pages.length}`, { scroll: false });
        }
    }, [data, router]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                rootMargin: "500px", // تنظیم فاصله مشاهده
            }
        );

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allArticles = data?.pages.flatMap((page) => page.data) || [];

    return (
        <div className="nc-BlogPage overflow-hidden relative">
            <div className="container relative">
                <div className={`nc-SectionLatestPosts relative py-16 lg:py-28`}>
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full xl:pr-14">
                            <Heading>اخبار و مقالات</Heading>

                            {/* Articles List */}
                            <div className={`grid gap-6 md:gap-8 grid-cols-1`}>
                                {allArticles.map((item, index) => (
                                    <Card3 key={index} className="" item={item}/>
                                ))}
                            </div>

                            {/* Infinite Scroll Loader */}
                            <div ref={lastElementRef}
                                 className="grid gap-6 md:gap-8 grid-cols-1 mt-6 md:mt-8">
                                {isFetchingNextPage && <BlogCardSkeleton/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listing;
