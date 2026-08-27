"use client";

import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { findCategoryGroupByUrl } from "@/services/api/shop/category";
import { CategoryListing } from "@/services/types/category";
import { ProductResponse } from "@/services/types/product";
import { BreadcrumbType } from "@/components/Breadcrumb/BreadcrumbType";
import ShopBreadcrump from "@/components/Breadcrumb/ShopBreadcrump";
import GroupCard from "@/components/Card/GroupCard";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useCategoryViewTracker } from "@/hooks/useCategoryViewTracker";

type Props = {
    response: CategoryListing;
    url: string;
    breadcrump: BreadcrumbType[];
};

const GroupListing = ({ response, url, breadcrump }: Props) => {
    const [filter] = useState("");

    useCategoryViewTracker(response.category?.id);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        ["categoryGroups", url, filter],
        ({ pageParam = 1 }) => findCategoryGroupByUrl(url, filter, pageParam),
        {
            initialData: { pages: [response], pageParams: [1] },
            getNextPageParam: (lastPage) => {
                const meta = lastPage?.products?.meta;
                return meta && meta.current_page < meta.last_page ? meta.current_page + 1 : undefined;
            },
        }
    );

    const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const groups: ProductResponse[] = data?.pages.flatMap((page) => page?.groups?.data ?? []) ?? [];

    return (
        <div className="nc-PageCollection dark:bg-neutral-900">
            <div className="container py-5 lg:pb-28 lg:mt-14 space-y-5 bg-slate-50 rounded-2xl">
                <div className="space-y-5 w-full flex flex-col justify-center items-center">
                    <h1 className="text-2xl">{response.category.name}</h1>
                    <ShopBreadcrump breadcrumb={breadcrump} bg="bg-slate-50" />

                    <main className="w-full">
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                            {groups.map((item) => (
                                <GroupCard
                                    key={item.id}
                                    featuredImage={`${item?.images?.[0]?.url}`}
                                    imageBaseUrl="product"
                                    name={item.name ?? ""}
                                    url={item.url ?? ""}
                                    item={item}
                                    color="bg-orange-50"
                                />
                            ))}
                        </div>

                        <div
                            ref={sentinelRef}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10"
                        >
                            {isFetchingNextPage && <ProductCardSkeleton />}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default GroupListing;
