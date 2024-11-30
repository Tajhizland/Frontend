//@ts-nocheck

"use client"
import React, {useState} from "react";
import SectionPromo1 from "@/components/SectionPromo1";
import ProductCardNew from "@/components/ProductCardNew";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import {useRouter} from "next/navigation";
import {BrandListingResponse} from "@/services/types/brand";
import {findBrandByUrl} from "@/services/api/shop/brand";
import CategoryCircleCard from "@/components/CircleCard/CategoryCircleCard";
import {ProductResponse} from "@/services/types/product";
import {getDiscountedProducts} from "@/services/api/shop/product";
import {searchPaginate} from "@/services/api/shop/search";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ProductCard2 from "@/components/ProductCard";

const Listing = async ({response}: { response: ProductResponse[] }) => {

    const [newResponse, setNewResponse] = useState();
    const router = useRouter();

    async function fetchData(page: number = 1) {
        router.push(`?page=${page}`);
        let data = await searchPaginate("", page)
        setNewResponse(data);
    }

    return (
        <div className={`nc-PageSearch dark:bg-neutral-900  mt-9  py-5`} data-nc-id="PageSearch">
            <div className="container">
                <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                    تخفیفی های تجهیزلند
                </h2>
                <span className="block mt-4 text-neutral-500 dark:text-white text-sm sm:text-base">
                        تمام محصولات تخفیفی تجهیزلند رو میتونید در این صفحه مشاهده کنید
                </span>
            </div>
            <hr className="border-slate-200 dark:border-slate-700"/>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
                <main>


                    {/* LOOP ITEMS */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                        {newResponse ? newResponse.data.map((item, index) => (
                            <ProductCardNew data={item} key={index}/>
                        )) : response.data.map((item, index) => (
                            <ProductCardNew data={item} key={index}/>
                        ))}
                    </div>

                    {/* PAGINATION */}
                    <div
                        className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                        <AdminPagination
                            currentPage={newResponse ? newResponse.meta?.current_page as number : response.meta?.current_page as number}
                            totalPages={newResponse ? newResponse.meta?.last_page as number : response.meta?.last_page as number}
                            onPageChange={(n) => {
                                fetchData(n)
                            }}/>
                    </div>
                </main>

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

export default Listing;
