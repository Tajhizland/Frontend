//@ts-nocheck
"use client";
import React, {useRef, useEffect, useState} from "react";
import {findCategoryByUrl} from "@/services/api/shop/category";
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
import {storeCategoryViewHistory} from "@/services/api/shop/categoryViewHistory";
import {useUser} from "@/services/globalState/GlobalState";

const PageCollection = ({response, url, breadcrump}: { response: any, url: string, breadcrump: BreadcrumbType[] }) => {
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
        queryFn: () => storeCategoryViewHistory({category_id : response.category.id}),
        enabled: !!user,
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
            const result = await findCategoryByUrl(url, filter, pageParam);
            return result;
        },
        {
            initialData: {
                pages: [response],
                pageParams: [1],
            },
            getNextPageParam: (lastPage) =>
                lastPage?.products?.meta?.current_page <
                lastPage?.products?.meta?.last_page
                    ? lastPage?.products?.meta?.current_page + 1
                    : undefined,
        }
    );
    const toggleProductInCompareList = (product: ProductResponse) => {
        const isMobile = window.innerWidth <= 768;
        const maxItems = isMobile ? 2 : 3;

        const isProductExist = compareList.some((item) => item.id === product.id);

        if (isProductExist) {
            setCompareList(compareList.filter((item) => item.id !== product.id));
        } else {
            if (compareList.length < maxItems) {
                setCompareList([...compareList, product]);
            } else {
                toast.error(`امکان مقایسه بیش از ${maxItems} محصول با هم وجود ندارد`);
            }
        }
    };


    const isProductInCompareList = (product: ProductResponse): boolean => {
        return compareList.some((item) => item.id === product.id);
    };

    // هنگام تغییر فیلتر، داده‌ها را مجدداً بارگذاری می‌کنیم
    const handleFilterChange = async (newFilter: string) => {
        setFilter(newFilter);
        setPage(1);  // Reset to first page when filter changes
        await refetch();
    };

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

    const allProducts = data?.pages.flatMap((page) => page.products.data) || [];

    return (
        <div className={`nc-PageCollection dark:bg-neutral-900`}>
            {
                compareList.length > 0 && <div onClick={() => {
                    setCompare(true)
                }}
                                               className={"fixed flex flex-col gap-1 justify-center items-center text-white z-50 md:bottom-10 md:right-10 bottom-20 right-5 shadow-xl bg-orange-600 rounded-full w-20 h-20 font-bold text-xs cursor-pointer hover:bg-opacity-80"}>
                    <FaCodeCompare/>
                    مقایسه کن
                </div>
            }

            {
                compare && <Compare close={() => {
                    setCompare(false)
                }} compareList={compareList} setCompareList={setCompareList}/>
            }
            <div className="container py-5 lg:pb-28 lg:pt-14 space-y-5 ">

                <div className="space-y-5">
                    <ShopBreadcrump breadcrumb={breadcrump}/>

                    {/* HEADING */}

                    {
                        response?.children?.data && response?.children?.data.length > 0 && (<>
                            <hr className="border-slate-200 dark:border-slate-700"/>
                            <div
                                className="flex overflow-x-auto  gap-1  lg:gap-5 text-center py-4">
                                {
                                    response?.children?.data?.map((item, index) => (
                                        <CategoryCircleCard2
                                            category={item}
                                            key={index}/>
                                    ))
                                }
                            </div>
                        </>)
                    }

                    <hr className="border-slate-200 dark:border-slate-700"/>

                    <main>
                        {/* TABS FILTER */}
                        <TabCategoryFilters
                            filters={response.category.filters.data}
                            categorys={response.children.data}
                            maxPrice={response.category.maxPrice}
                            minPrice={response.category.minPrice}
                            changeFilter={handleFilterChange}
                        />
                        <TabCategoryFiltersMobile
                            filters={response.category.filters.data}
                            categorys={response.children.data}
                            maxPrice={response.category.maxPrice}
                            minPrice={response.category.minPrice}
                            changeFilter={handleFilterChange}
                        />
                        {/* LOOP ITEMS */}
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                            {allProducts.map((item, index) => (
                                // <ProductCard
                                //     data={item}
                                //     key={index}
                                // />
                                <ProductCardWithCompare
                                    data={item}
                                    key={index}
                                    addToCompare={()=>{toggleProductInCompareList(item)}}
                                    isProductInCompareList={isProductInCompareList(item)}
                                />

                            ))}
                        </div>

                        <div ref={lastElementRef}
                             className="grid sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4  gap-x-8 gap-y-5 sm:gap-y-10 mt-8 lg:mt-10">
                            {isFetchingNextPage && <ProductCardSkeleton/>}
                        </div>
                    </main>
                </div>

                <hr className="border-slate-200 dark:border-slate-700"/>
                <div>
                    <div className="max-w-screen-sm">
                        <h2 className="block text-xl sm:text-2xl lg:text-3xl font-semibold dark:text-white">
                            {response.category.name}
                        </h2>
                    </div>

                    <span className="block mt-4 text-neutral-500 text-sm sm:text-base dark:text-white">
                    <TextExpander2 text={response.category.description}/>
                        {/* <div
                            dangerouslySetInnerHTML={{
                                __html: response.category.description,
                            }}
                        /> */}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PageCollection;
