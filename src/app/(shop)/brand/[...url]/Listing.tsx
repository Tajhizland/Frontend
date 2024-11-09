"use client"
import React, {useState} from "react";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCardNew from "@/components/ProductCardNew";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import {useRouter} from "next/navigation";
import {BrandListingResponse} from "@/services/types/brand";
import {findBrandByUrl} from "@/services/api/shop/brand";
import CategoryCircleCard from "@/components/CircleCard/CategoryCircleCard";

const PageCollection = ({response, url}: { response: BrandListingResponse, url: string }) => {
    const [newResponse, setNewResponse] = useState<BrandListingResponse | null>();
    const [filter, setFilter] = useState<number>();
    const router = useRouter();

    async function fetchData(filters: string, page: number = 1) {
        router.push(`?page=${page}`);
        let data = await findBrandByUrl(url, filters, page)
        setNewResponse(data);
    }

    async function changeFilter(value: number) {
        if (filter == value) {
            setFilter(undefined)
            await fetchData(``, 1);
        } else {
            setFilter(value);
            await fetchData(`filter[category]=${value}`, 1);
        }
    }

    return (
        <div className={`nc-PageCollection`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            {response.brand.name}
                        </h2>
                        <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                            <div dangerouslySetInnerHTML={{__html: (response.brand.description)}}/>
                        </span>
                    </div>
                    <div className="flex">
                        <div
                            className={"grid justify-items-center items-center justify-center grid-cols-2  sm:grid-cols-4  lg:grid-cols-8  xl:grid-cols-10 gap-5  text-center"}>
                            {
                                response?.categories?.data?.map((item, index) => (
                                    <CategoryCircleCard category={item} active={item.id == filter} key={index}
                                                        onClick={changeFilter}/>
                                ))
                            }
                        </div>
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700"/>
                    <main>
                        {/* TABS FILTER */}
                        {/*<TabFilters filters={response.category.filters.data} maxPrice={response.category.maxPrice}*/}
                        {/*    minPrice={response.category.minPrice} changeFilter={fetchData} />*/}

                        {/* LOOP ITEMS */}
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {newResponse ? newResponse.products.data.map((item, index) => (
                                <ProductCardNew data={item} key={index}/>
                            )) : response.products.data.map((item, index) => (
                                <ProductCardNew data={item} key={index}/>
                            ))}
                        </div>


                        {/* PAGINATION */}
                        <div
                            className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                            <AdminPagination
                                currentPage={newResponse ? newResponse.products.meta?.current_page as number : response.products.meta?.current_page as number}
                                totalPages={newResponse ? newResponse.products.meta?.last_page as number : response.products.meta?.last_page as number}
                                onPageChange={(n) => {
                                    fetchData(filter ? `filter[category]=${filter}` : "", n)
                                }}/>
                        </div>
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
