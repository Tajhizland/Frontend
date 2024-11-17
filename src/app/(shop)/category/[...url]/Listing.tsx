//@ts-nocheck
"use client"
import React, {useCallback, useEffect, useRef, useState} from "react";
import SectionPromo1 from "@/components/SectionPromo1";
import TabFilters from "@/components/TabFilters";
import {findCategoryByUrl} from "@/services/api/shop/category";
import ProductCardNew from "@/components/ProductCardNew";
import {CategoryListing} from "@/services/types/category";
import {useRouter} from "next/navigation";
import {ProductResponse} from "@/services/types/product";
import ProductCardSkeleton from "@/components/Skeleton/ProductCardSkeleton";

const PageCollection = ({response, url}: { response: CategoryListing, url: string }) => {
    const [newResponseProduct, setNewResponseProduct] = useState<ProductResponse[] | null>(response.products.data);
    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const router = useRouter();
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastElementRef = useRef<HTMLDivElement>(null);

    async function fetchMain(filters: string, page: number = 1) {
        router.push(`?page=${page}`);
        setFilter(filters);
        setPage(page)
        let data = await findCategoryByUrl(url, filters, page)
        setNewResponseProduct(data.products.data);
        if (data?.products?.meta?.last_page >= page + 1) {
            setHasMore(true);
        }
        setLoading(false)
    }

    const fetchData = useCallback(async (filters: string, page = 1) => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            router.replace(`?page=${page}`, {scroll: false});
            const data = await findCategoryByUrl(url, filters, page)
            if (data?.products?.meta?.last_page < page + 1) {
                setHasMore(false);
            }
            setNewResponseProduct((prevResponse) => [
                ...(prevResponse || []),
                ...data.products.data
            ]);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                setPage((prevPage) => prevPage + 1);
            }
        }, {
            rootMargin: '2000px',
        });

        if (lastElementRef.current) {
            observer.current.observe(lastElementRef.current);
        }

        return () => {
            if (observer.current) observer.current.disconnect();
        };
    }, [loading, hasMore]);


    useEffect(() => {
        if (page > 1) {
            fetchData(filter, page);
        }
    }, [page, fetchData]);

    return (
        <div className={`nc-PageCollection`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            {response.category.name}
                        </h2>
                        <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                            <div dangerouslySetInnerHTML={{__html: (response.category.description)}}/>
                        </span>
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700"/>
                    <main>
                        {/* TABS FILTER */}
                        <TabFilters filters={response.category.filters.data} maxPrice={response.category.maxPrice}
                                    minPrice={response.category.minPrice} changeFilter={fetchMain}/>

                        {/* LOOP ITEMS */}
                        <div
                            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {newResponseProduct && newResponseProduct.map((item, index) => (
                                <ProductCardNew data={item} key={index}/>
                            ))}
                        </div>
                        <div ref={lastElementRef}
                             className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {hasMore && <ProductCardSkeleton/>}
                        </div>


                        {/* PAGINATION */}
                        {/*<div*/}
                        {/*    className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">*/}
                        {/*    <AdminPagination*/}
                        {/*        currentPage={newResponse ? newResponse.products.meta?.current_page as number : response.products.meta?.current_page as number}*/}
                        {/*        totalPages={newResponse ? newResponse.products.meta?.last_page as number : response.products.meta?.last_page as number}*/}
                        {/*        onPageChange={(n) => {*/}
                        {/*            fetchData(filter, n)*/}
                        {/*        }}/>*/}
                        {/*</div>*/}
                    </main>
                </div>

                {/* === SECTION 5 === */}
                <hr className="border-slate-200 dark:border-slate-700"/>

                {/*<SectionSliderCollections />*/}
                <hr className="border-slate-200 dark:border-slate-700"/>

                {/* SUBCRIBES */}
                <SectionPromo1/>
            </div>
        </div>
    );
};

export default PageCollection;
