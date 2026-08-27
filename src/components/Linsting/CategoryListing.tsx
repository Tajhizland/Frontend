"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useInfiniteQuery } from "react-query";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { findCategoryByUrl } from "@/services/api/shop/category";
import { CategoryListing } from "@/services/types/category";
import { ProductResponse } from "@/services/types/product";
import { BreadcrumbType } from "@/components/Breadcrumb/BreadcrumbType";
import ShopBreadcrump from "@/components/Breadcrumb/ShopBreadcrump";
import TabCategoryFilters from "@/components/Filter/TabCategoryFilters";
import TabCategoryFiltersMobile from "@/components/Filter/TabCategoryFiltersMobile";
import CategoryCircleCard2 from "@/components/Card/CategoryCircleCard2";
import ProductCardWithCompare from "@/components/Card/ProductCardWithCompare";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import SectionGroupSlider from "@/components/Section/SectionGroupSlider";
import TextExpander2 from "@/shared/TextExpander/TextExpander2";
import Compare from "@/components/Compare/Compare";
import CompareBar from "@/components/Compare/CompareBar";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useCompareList } from "@/hooks/useCompareList";
import { useCategoryViewTracker } from "@/hooks/useCategoryViewTracker";

type Props = {
    response: CategoryListing;
    url: string;
    breadcrump: BreadcrumbType[];
};

const CategoryListingPage = ({ response, url, breadcrump }: Props) => {
    const [filter, setFilter] = useState("");
    const compare = useCompareList();

    useCategoryViewTracker(response.category?.id);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(
        ["categoryProducts", url, filter],
        ({ pageParam = 1 }) => findCategoryByUrl(url, filter, pageParam),
        {
            initialData: { pages: [response], pageParams: [1] },
            getNextPageParam: (lastPage) => {
                const meta = lastPage?.products?.meta;
                return meta && meta.current_page < meta.last_page ? meta.current_page + 1 : undefined;
            },
        }
    );

    const sentinelRef = useInfiniteScroll({ hasNextPage, isFetchingNextPage, fetchNextPage });

    const products: ProductResponse[] = data?.pages.flatMap((page) => page?.products?.data ?? []) ?? [];
    const groups = response?.groups?.data ?? [];
    const children = response?.children?.data ?? [];

    return (
        <div className="nc-PageCollection dark:bg-neutral-900">
            <CompareBar items={compare.items} onOpen={compare.open} onClear={compare.clear} />

            {compare.isOpen && (
                <Compare close={compare.close} compareList={compare.items} setCompareList={compare.setItems} />
            )}

            <div className="container py-2 lg:pb-28 lg:pt-14 space-y-5">
                <div className="space-y-2 sm:space-y-5">
                    <ShopBreadcrump breadcrumb={breadcrump} />

                    {groups.length > 0 && (
                        <>
                            <hr className="border-slate-200 dark:border-slate-700" />
                            <div className="flex flex-col sm:flex-row rounded-3xl overflow-hidden w-full">
                                <div className="bg-[#fcb415] w-full sm:w-52 px-2 flex flex-col gap-4 p-2 justify-center items-center">
                                    <span>انتخاب سریع</span>
                                    <strong className="font-extrabold">انواع</strong>
                                    <strong className="text-center font-extrabold">{breadcrump[0]?.title}</strong>
                                    <Link href={`/category-group/${response.category?.url}`}>
                                        <div className="flex items-center relative gap-x-2">
                                            <span className="text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-800">
                                                مشاهده همه
                                            </span>
                                            <IoIosArrowDropleftCircle className="w-4 h-4 text-slate-800" />
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex w-full">
                                    <SectionGroupSlider data={groups} />
                                </div>
                            </div>
                        </>
                    )}

                    {children.length > 0 && (
                        <>
                            <hr className="border-slate-200 dark:border-slate-700" />
                            <div className="flex overflow-x-auto gap-1 lg:gap-5 text-center py-2">
                                {children.map((item) => (
                                    <CategoryCircleCard2 category={item} key={item.id} />
                                ))}
                            </div>
                        </>
                    )}

                    <hr className="border-slate-200 dark:border-slate-700" />

                    <main>
                        <TabCategoryFilters
                            filters={response.category.filters}
                            categorys={children}
                            maxPrice={response.category.maxPrice}
                            minPrice={response.category.minPrice}
                            changeFilter={setFilter}
                        />
                        <TabCategoryFiltersMobile
                            filters={response.category.filters}
                            categorys={children}
                            maxPrice={response.category.maxPrice}
                            minPrice={response.category.minPrice}
                            changeFilter={setFilter}
                        />

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                            {products.map((item) => (
                                <ProductCardWithCompare
                                    data={item}
                                    key={item.id}
                                    addToCompare={() => compare.toggle(item)}
                                    isProductInCompareList={compare.has(item)}
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

                <hr className="border-slate-200 dark:border-slate-700" />

                <div>
                    <div className="max-w-screen-sm">
                        <h2 className="block text-xl sm:text-2xl lg:text-3xl font-semibold dark:text-white">
                            {response.category.name}
                        </h2>
                    </div>
                    <span className="block mt-4 text-neutral-500 text-sm sm:text-base dark:text-white">
                        <TextExpander2 text={response.category.description} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CategoryListingPage;
