//@ts-nocheck
"use client";

import React, { useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getNewsPaginated } from "@/services/api/shop/news";
import Heading from "@/components/Heading/Heading";
import { useRouter } from "next/navigation";
import BlogCardSkeleton from "@/components/Skeleton/BlogCardSkeleton";
import Link from "next/link";
import { Route } from "next";
import Image from "next/image";
import BlogLastPost from "@/components/Blog/BlogLastPost";
import BlogCategory from "@/components/Blog/BlogCategory";
import BlogCard from "@/components/Card/BlogCard";

const BlogListing = ({ response }: { response }) => {
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isSuccess,
    } = useInfiniteQuery(
        ["news",filter],
        async ({ pageParam = 1 }) => {
            const result = await getNewsPaginated(pageParam,filter);
            return result.listing;
        },
        {
            initialData: {
                pages: [response.listing],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) =>
                lastPage?.meta?.current_page < lastPage?.meta?.last_page
                    ? lastPage?.meta?.current_page + 1
                    : undefined,
            refetchOnWindowFocus: false,
        }
    );

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

    // هر بار که صفحه تغییر می‌کند، URL را به‌روز می‌کنیم
    useEffect(() => {
        if (page > 1) {
            router.replace(`?page=${page}`, { scroll: false });
        }
    }, [page, router]);


    const handleFilterChange =  async (filters: string) => {
        setFilter(filters);
        setPage(1)
    };

    const allArticles = data?.pages.flatMap((page) => page.data) || [];
    return (
        <div className="nc-BlogPage overflow-hidden relative">
            <div className="container relative">
                <div className={`nc-SectionLatestPosts relative py-5 lg:py-16  `}>
                    <div className="flex flex-col lg:flex-row">
                        <div className="w-full xl:pr-14">
                            <div
                                className={`relative w-full aspect-w-2 sm:aspect-w-3  lg:aspect-w-5 aspect-h-1 rounded-2xl overflow-hidden group border`}
                            >
                                {
                                    response.banner.data.map((item, index) => (
                                        <Link key={index} href={item.url as Route} title={"link"}>
                                            <Image
                                                alt=""
                                                fill
                                                className="w-full h-full object-cover"
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banner/${item.image}`}
                                            />
                                        </Link>))
                                }
                            </div>
                            <div className="flex flex-col lg:flex-row gap-10 mt-5">

                                <div className="flex-[3]">
                                    {/* Articles List */}
                                    <div className={`grid gap-6 md:gap-8 grid-cols-1 mt-5`}>
                                        {allArticles.map((item, index) => (
                                            <BlogCard key={index} className="" item={item} />
                                        ))}
                                    </div>

                                    {/* Infinite Scroll Loader */}
                                    <div ref={lastElementRef}
                                        className="grid gap-6 md:gap-8 grid-cols-1 mt-6 md:mt-8">
                                        {isFetchingNextPage && <BlogCardSkeleton />}
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-10 ">
                                    <BlogCategory categoryList={response.category.data} changeFilter={handleFilterChange} />
                                    <BlogLastPost blogs={response.lastPost.data} />
                                </div>
                            </div>
                            <Heading>اخبار و مقالات</Heading>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogListing;
