"use client"
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProductCardNew from "@/components/ProductCardNew";
import { useInfiniteQuery } from "react-query";
import { BrandListingResponse } from "@/services/types/brand";
import { findBrandByUrl } from "@/services/api/shop/brand";
import CategoryCircleCard from "@/components/CircleCard/CategoryCircleCard";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import {CgScrollH, CgSwap} from "react-icons/cg";
import ShopBreadcrump from "@/components/Breadcrumb/ShopBreadcrump";
import Link from "next/link";
import {Route} from "next";
import Image from "next/image";

const PageCollection = ({ response, url }: { response: BrandListingResponse, url: string }) => {
    const [filter, setFilter] = useState<number>();
    const router = useRouter();
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
        isFetching,
    } = useInfiniteQuery(
        ["brandProducts", url, filter],
        async ({ pageParam = 1 }) => {
            const result = await findBrandByUrl(url, filter ? `filter[category]=${filter}` : "", pageParam);
            return result;
        },
        {
            initialData: {
                pages: [response],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) => {
                //@ts-ignore
                return lastPage?.products?.meta?.current_page < lastPage?.products?.meta?.last_page
                    //@ts-ignore
                    ? lastPage?.products?.meta?.current_page + 1
                    : undefined;
            },
        }
    );

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
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
        if (data) {
            const currentPage = data.pages[data.pages.length - 1]?.products?.meta?.current_page;
            if (currentPage) {
                router.push(`?page=${currentPage}`, { scroll: false });
            }
        }
    }, [data, router]);

    const allProducts = data?.pages.flatMap((page) => page.products.data) || [];

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
        <div className={`nc-PageCollection dark:bg-neutral-900`}>
            <div className="container py-0  lg:py-10  lg:pb-28   space-y-16 sm:space-y-20 lg:space-y-28">
            <ShopBreadcrump breadcrumb={[{
                href:"brand" ,
                title:"برند ها"
            } , {
                title:response.brand.name ,
                href:"brand/"+response.brand.url
            }]} />
                <div
                    className={`relative w-full aspect-w-9 aspect-h-2 rounded-2xl overflow-hidden group border !m-0`}
                >
                    {
                        response.banner.data.map((item,index)=>(
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
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}


                    <div className="flex flex-col">
                        <div
                            className="flex hiddenScrollbar overflow-x-auto lg:flex-wrap lg:justify-items-center lg:items-center lg:justify-center lg:grid-cols-8 xl:grid-cols-10 gap-1  lg:gap-5 text-center">
                            {
                                response?.categories?.data?.map((item, index) => (
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
                    <main>
                    {/* LOOP ITEMS */}
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {allProducts.length === 0 && !isLoading
                                ? <div></div>
                                : allProducts.map((item, index) => (
                                    <ProductCardNew data={item} key={index}/>
                                ))
                            }
                        </div>

                        {/* Loading more products indicator */}
                        <div ref={lastElementRef}
                             className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {isFetchingNextPage && <ProductCardSkeleton/>}
                        </div>
                    </main>
                    <hr/>
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                            {response.brand.name}
                        </h2>
                        <span className="block mt-4 text-neutral-500 dark:text-white text-sm sm:text-base">
                            <div dangerouslySetInnerHTML={{__html: response.brand.description}}/>
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PageCollection;
