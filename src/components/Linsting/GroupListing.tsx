//@ts-nocheck
"use client";
import React, {useRef, useEffect, useState} from "react";
import {findCategoryByUrl, findCategoryGroupByUrl} from "@/services/api/shop/category";
import {useRouter} from "next/navigation";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";
import {useInfiniteQuery, useQuery} from "react-query";
import {BreadcrumbType} from "@/components/Breadcrumb/BreadcrumbType";
import ShopBreadcrump from "@/components/Breadcrumb/ShopBreadcrump";
import TextExpander2 from "@/shared/TextExpander/TextExpander2";
import TabCategoryFilters from "@/components/Filter/TabCategoryFilters";
import CategoryCircleCard2 from "@/components/Card/CategoryCircleCard2";
import TabCategoryFiltersMobile from "@/components/Filter/TabCategoryFiltersMobile";
import ProductCardWithCompare from "@/components/Card/ProductCardWithCompare";
import {ProductResponse} from "@/services/types/product";
import Compare from "@/components/Compare/Compare";
import {FaCodeCompare} from "react-icons/fa6";
import {toast} from "react-hot-toast";
import {storeCategoryViewHistory, storeCategoryViewHistoryIp} from "@/services/api/shop/categoryViewHistory";
import {useUser} from "@/services/globalState/GlobalState";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import ButtonClose from "@/shared/Button/ButtonClose";
import CategoryCard from "@/components/Card/CategoryCard";
import GroupCard from "@/components/Card/GroupCard";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import SectionGroupSlider from "@/components/Section/SectionGroupSlider";

const GroupListing = ({response, url, breadcrump}: { response: any, url: string, breadcrump: BreadcrumbType[] }) => {
    const router = useRouter();
    const [filter, setFilter] = useState<string>("");
    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState<number>(1);  // مدیریت صفحه
    const [compareList, setCompareList] = useState<ProductResponse>([]);
    const [compare, setCompare] = useState<boolean>(false);
    const [user] = useUser();

    useQuery({
        queryKey: ['store-category-view'],
        queryFn: () => storeCategoryViewHistory({category_id: response.category.id}),
        enabled: !!user,
    });
    useQuery({
        queryKey: ['store-category-view-ip'],
        queryFn: () => storeCategoryViewHistoryIp({category_id: response.category.id}),
        enabled: !user,
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery(
        ["categoryProducts", url, filter],
        async ({pageParam = 1}) => {
            const result = await findCategoryGroupByUrl(url, filter, pageParam);
            return result;
        },
        {
            initialData: {
                pages: [response],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) =>
                lastPage?.groups?.meta?.current_page <
                lastPage?.groups?.meta?.last_page
                    ? lastPage?.groups?.meta?.current_page + 1
                    : undefined,
        }
    );

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                    setPage((prevPage) => prevPage + 1);  // Update the page state
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
            router.replace(`?page=${page}`, {scroll: false});
        }
    }, [page, router]);

    const allGroups = data?.pages.flatMap((page) => page.groups.data) || [];

    return (
        <div className={`nc-PageCollection dark:bg-neutral-900`}>

            <div className="container py-5 lg:pb-28 lg:mt-14 space-y-5  bg-slate-50 rounded-2xl">

                <div className="space-y-5 w-full  flex flex-col justify-center items-center">
                    <h1 className={"text-2xl"}>
                        {response.category.name}
                    </h1>
                    <ShopBreadcrump breadcrumb={breadcrump} bg={"bg-slate-50"} />
                    <main className={"w-full"}>
                        <div
                            className="grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                            {allGroups.map((item, index) => (
                                <GroupCard
                                    featuredImage={`${item?.images?.data[0]?.url}`}
                                    imageBaseUrl={"product"}
                                    name={item.name ?? ""}
                                    url={item.url ?? ""}
                                    key={item.id}
                                    item={item}
                                    color={"bg-orange-50"}
                                />
                            ))}

                        </div>

                        <div ref={lastElementRef}
                             className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                            {isFetchingNextPage && <ProductCardSkeleton/>}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default GroupListing;
