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
                compareList.length > 0 &&
                <div
                    className={`
       rounded-2xl overflow-hidden whitespace-nowrap fixed z-50
        md:right-1/2 md:translate-x-1/2 border
        bottom-[70px] right-2 sm:right-1/2 sm:translate-x-1/2 w-fit
        bg-white bg-opacity-80 p-1 sm:p-3 shadow-lg
      `}
                >
                    <div className={" flex gap-2 sm:gap-4  relative"}>

                        <div onClick={() => {
                            setCompare(true)
                        }}
                             className={" flex flex-col gap-1 rounded-r-2xl flex-shrink-0 justify-center items-center text-black  shadow-xl bg-[#fcb415]   w-16 sm:w-20 h-16 sm:h-20 font-bold text-xs sm:text-sm cursor-pointer hover:bg-opacity-80 text-center"}>
                            مقایسه
                            <br/>
                            {compareList.length > 1 ? compareList.length : ""}
                            {" "}
                            کالا
                        </div>

                        {
                            compareList.map((item: ProductResponse) => (
                                <div key={item.id}
                                     className="relative w-16 sm:w-20   bg-slate-50 dark:bg-slate-300 overflow-hidden z-1 group border">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item?.images?.data[0]?.url}`}
                                        className="object-cover w-full h-full drop-shadow-xl flex "
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                        alt="product"
                                    />
                                </div>
                            ))
                        }
                        <div className={"flex justify-center items-center"}>
                            <div onClick={() => {
                                setCompareList([])
                            }}
                                 className={"flex items-center justify-center cursor-pointer  rounded-full bg-red-500 text-white font-bold w-4 h-4"}>
                                x
                            </div>
                        </div>

                    </div>
                </div>
            }

            {
                compare && <Compare close={() => {
                    setCompare(false)
                }} compareList={compareList} setCompareList={setCompareList}/>
            }
            <div className="container py-2 lg:pb-28 lg:pt-14 space-y-5 ">

                <div className="space-y-2 sm:space-y-5">
                    <ShopBreadcrump breadcrumb={breadcrump}/>

                    {
                        response?.groups?.data && response?.groups?.data.length > 0 && (<>
                            <hr className="border-slate-200 dark:border-slate-700"/>
                            <div className={"flex flex-col sm:flex-row rounded-3xl overflow-hidden w-full"}>
                                <div className={"bg-[#fcb415] w-full sm:w-52  px-2 flex flex-col gap-4 p-2 justify-center items-center "}>
                            <span>
                                انتخاب سریع
                            </span>
                                    <strong className={" font-extrabold"}>
                                        انواع
                                    </strong>
                                    <strong className={"text-center font-extrabold"}>
                                        {
                                            breadcrump[0].title
                                        }
                                    </strong>
                                    <Link href={"/category-group/"+response.category?.url}>
                                        <div className="flex items-center relative gap-x-2">
                                    <span
                                        className="text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-800 ">مشاهده همه  </span>
                                            <IoIosArrowDropleftCircle className={"w-4 h-4 text-slate-800 "}/>
                                        </div>
                                    </Link>
                                </div>

                                <div className={"flex w-full"}>
                                    <SectionGroupSlider
                                        data={response?.groups?.data}
                                    />
                                </div>

                                {/*<div*/}
                                {/*    className="grid grid-cols-2 md:grid-cols-5 overflow-x-auto  gap-1  lg:gap-5 text-center  bg-stone-100  py-4 px-2 w-full">*/}

                                {/*    {*/}
                                {/*        response?.groups?.data?.map((item, index) => (*/}

                                {/*            <GroupCard*/}
                                {/*                featuredImage={`${item?.images?.data[0]?.url}`}*/}
                                {/*                imageBaseUrl={"product"}*/}
                                {/*                name={item?.name}*/}
                                {/*                url={item.url}*/}
                                {/*                key={item.id}*/}
                                {/*                color={"bg-orange-50"}*/}
                                {/*                {...item}*/}
                                {/*            />*/}
                                {/*        ))*/}
                                {/*    }*/}

                                {/*</div>*/}
                            </div>
                        </>)

                    }

                    {/* HEADING */}

                    {
                        response?.children?.data && response?.children?.data.length > 0 && (<>
                            <hr className="border-slate-200 dark:border-slate-700"/>
                            <div
                                className="flex overflow-x-auto  gap-1  lg:gap-5 text-center py-2">
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
                                    addToCompare={() => {
                                        toggleProductInCompareList(item)
                                    }}
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
