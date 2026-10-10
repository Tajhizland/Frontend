"use client";

import ShopPagination from "@/shared/Pagination/ShopPagination";
import React, { useRef, useEffect, useState } from "react";
import {NewsListingResponse} from "@/services/types/news";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNewsPaginated } from "@/services/api/shop/news";
import Heading from "@/components/Heading/Heading";
import BlogCardSkeleton from "@/components/Skeleton/BlogCardSkeleton";
import Link from "next/link";
import { Route } from "next";
import Image from "next/image";
import BlogLastPost from "@/components/Blog/BlogLastPost";
import BlogCategory from "@/components/Blog/BlogCategory";
import BlogCard from "@/components/Card/BlogCard";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";
import BlogMobileCategory from "@/components/Blog/BlogMobileCategory";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

const BlogListing = ({response}: {response: NewsListingResponse}) => {
    const [filter, setFilter] = useState<string>("");

    const initialPage = response.listing.meta?.current_page || 1;
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isSuccess,
    } = useInfiniteQuery({
        queryKey: ["news",filter, initialPage],
        queryFn: async ({ pageParam }) => {
            const result = await getNewsPaginated(pageParam,filter);
            return result.listing;
        },
        initialPageParam: (filter ? 1 : initialPage),
        initialData: !filter ? {
                pages: [response.listing],
                pageParams: [initialPage],
            } : undefined,
            getNextPageParam: (lastPage) =>
                lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    ? lastPage?.meta?.current_page + 1
                    : undefined,
            refetchOnWindowFocus: false,
    });

    const sentinelRef = useInfiniteScroll({hasNextPage, isFetchingNextPage, fetchNextPage});

    // هر بار که صفحه تغییر می‌کند، URL را به‌روز می‌کنیم



    const handleFilterChange =  async (filters: string) => {
        setFilter(filters);

    };

    const allArticles = data?.pages.flatMap((page) => page.data) || [];
    return (
        <div className="nc-BlogPage overflow-hidden relative">

            <div className="container relative">
                <div className={`nc-SectionLatestPosts relative py-5 lg:py-16  `}>
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full xl:pr-14 space-y-5">
                            <SectionSingleBanner banner={response.banner.data[0]}/>
                            <BlogMobileCategory  categoryList={response.category.data} changeFilter={handleFilterChange}  />

                            <div className="flex flex-col-reverse lg:flex-row gap-10  ">

                                <div className="flex-3">
                                    {/* Articles List */}
                                    <div className={`grid gap-6 md:gap-8 grid-cols-1 md:mt-5`}>
                                        {allArticles.map((item, index) => (
                                            <BlogCard key={index} className="" item={item} />
                                        ))}
                                    </div>


                        {!filter && <ShopPagination currentPage={initialPage} totalPages={response.listing.meta?.last_page || 1} url={"/news"} />}

                                    {/* Infinite Scroll Loader */}
                                    <div ref={sentinelRef}
                                        className="grid gap-6 md:gap-8 grid-cols-1   md:mt-5">
                                        {isFetchingNextPage && <BlogCardSkeleton />}
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-10 ">
                                    <BlogCategory categoryList={response.category.data} changeFilter={handleFilterChange} />
                                    <BlogLastPost blogs={response.lastPost.data} />
                                </div>
                            </div>
                            <h1 className="text-2xl font-semibold dark:text-white">اخبار و مقالات</h1>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogListing;
