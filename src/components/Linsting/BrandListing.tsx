"use client"
import {normalizeContentHeadings} from "@/utils/seo";
import ShopPagination from "@/shared/Pagination/ShopPagination";
import React, {useState, useEffect, useRef} from "react";
import {useInfiniteQuery} from "@tanstack/react-query";
import {BrandListingResponse} from "@/services/types/brand";
import {findBrandByUrl} from "@/services/api/shop/brand";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import {CgScrollH, CgSwap} from "react-icons/cg";
import ShopBreadcrump from "@/components/Breadcrumb/ShopBreadcrump";
import Link from "next/link";
import {Route} from "next";
import Image from "next/image";
import CategoryCircleCard from "@/components/Card/CategoryCircleCard";
import ProductCard from "@/components/Card/ProductCard";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";
import Spinner from "@/shared/Loading/Spinner";
import {useInfiniteScroll} from "@/hooks/useInfiniteScroll";

const BrandListing = ({response, url}: { response: BrandListingResponse, url: string }) => {
    const [filter, setFilter] = useState<number>();
    const [loadingFilter, setLoadingFilter] = useState<boolean>(false);

    const initialPage = response.products.meta?.current_page || 1;
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        refetch,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ["brandProducts", url, filter, initialPage],
        queryFn: async ({pageParam}) => {
            const result = await findBrandByUrl(url, filter ? `filter[category]=${filter}` : "", pageParam);
            return result;
        },
        initialPageParam: (filter ? 1 : initialPage),
        initialData: !filter ? {
                pages: [response],
                pageParams: [initialPage],
            } : undefined,
            getNextPageParam: (lastPage) => {
                //@ts-ignore
                return lastPage?.products?.meta?.current_page < lastPage?.products?.meta?.last_page
                    //@ts-ignore
                    ? lastPage?.products?.meta?.current_page + 1
                    : undefined;
            },
    });

    const sentinelRef = useInfiniteScroll({hasNextPage, isFetchingNextPage, fetchNextPage});



    const allProducts = data?.pages.flatMap((page) => page.products.data) || [];

    const changeFilter = async (value: number) => {
        if (filter === value) {
            setFilter(undefined);
        } else {
            setFilter(value);
        }
    };

    return (
        <div className={`nc-PageCollection dark:bg-neutral-900`}>
            <div className="container py-0  lg:py-10  lg:pb-28 ">
                <ShopBreadcrump breadcrumb={[{
                    href: "brand",
                    title: "برند ها"
                }, {
                    title: response.brand.name,
                    href: "brand/" + response.brand.url
                }]}/>

                {
                    response.brand.banner && response.brand.banner != "" ?
                        <div
                            className={`relative w-full aspect-w-2 sm:aspect-w-3  lg:aspect-w-4 aspect-h-1 rounded-2xl overflow-hidden group border`}
                        >
                            <Image
                                alt={response.brand.name}
                                loading="eager"
                                fetchPriority="high"
                                sizes="100vw"
                                fill
                                className="w-full h-full object-cover"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand-banner/${response.brand.banner}`}
                            />

                        </div>
                        :
                        <SectionSingleBanner banner={response.banner.data[0]}/>
                }

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
                    {
                        isLoading ? <div><Spinner/></div>
                            :
                            <main>
                                {/* LOOP ITEMS */}
                                <div
                                    className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                                    {allProducts.length === 0 && !isLoading
                                        ? <div></div>
                                        : allProducts.map((item, index) => (
                                            <ProductCard priority={index < 4} data={item} key={item.id}/>
                                        ))
                                    }
                                </div>

                                {/* Loading more products indicator */}
                                <div ref={sentinelRef}
                                     className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                                    {isFetchingNextPage && <ProductCardSkeleton/>}
                                </div>

                        {!filter && <ShopPagination currentPage={initialPage} totalPages={response.products.meta?.last_page || 1} url={`/brand/${url}`} />}
                    </main>

                    }
                    <hr/>
                    <div className="w-full min-w-0 max-w-none">
                        <h1 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                            {response.brand.name}
                        </h1>
                        <div
                            className="mt-4 w-full break-words text-neutral-500 dark:text-white text-sm sm:text-base"
                            dangerouslySetInnerHTML={{__html: normalizeContentHeadings(response.brand.description)}}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BrandListing;
