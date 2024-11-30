//@ts-nocheck
"use client"
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import {getSpecialProductsPaginate} from "@/services/api/shop/product";
import ProductCardNew from "@/components/ProductCardNew";
import {ProductResponse} from "@/services/types/product";

export default function Listing({response} )
{
    const [newResponse, setNewResponse] = useState();
    const router = useRouter();

    async function fetchData(page: number = 1) {
        router.push(`?page=${page}`);
        let data = await getSpecialProductsPaginate(page)
        setNewResponse(data);
    }

    return(<>
        <div className={`nc-PageCollection dark:bg-neutral-900`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                            محصولات خاص پسند ها
                        </h2>

                    </div>

                    <hr className="border-slate-200 dark:border-slate-700"/>
                    <main>
                        {/* TABS FILTER */}

                        {/* LOOP ITEMS */}
                        <div
                            className="grid  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {newResponse?
                                newResponse.data.map((item:ProductResponse, index:number) => (
                                    <ProductCardNew data={item} key={index}/>
                                ))
                                :response.data.map((item:ProductResponse, index:number) => (
                                    <ProductCardNew data={item} key={index}/>
                                ))
                            }
                        </div>

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
                </div>

            </div>
        </div>
    </>)
}
