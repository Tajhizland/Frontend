"use client"
//@ts-nocheck

import React, {useState} from "react";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import {searchPaginate} from "@/services/api/shop/search";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import {useQuery} from "react-query";
import {useRouter} from "next/navigation";
import ProductCardNew from "@/components/ProductCardNew";

interface BrandPageProps {
    params: {
        query: [string];
    },
    searchParams: {
        page?: string;
    }
}

const PageSearch = ({params, searchParams}: BrandPageProps) => {

    const [page, setPage] = useState(searchParams.page ? parseInt(searchParams.page, 10) : 1);
    const [query, setQuery] = useState(decodeURIComponent(params.query.join(" ")));
    const [searchQuery, setSearchQuery] = useState(decodeURIComponent(params.query.join(" ")));
    const router = useRouter();


    const {data: products} = useQuery({
        queryKey: ['my-order', page, searchQuery],
        queryFn: () => searchPaginate(query, page),
        staleTime: 5000,
    });

    function changePageHandle(page: number) {
        setPage(page);
        router.push(`?page=${page}`);

    }

    function changeQueryHandle() {
        setSearchQuery(query);
    }


    return (
        <>
            {/*<head>*/}
            {/*    <title>جستجو</title>*/}
            {/*</head>*/}
            <div className={`nc-PageSearch`} data-nc-id="PageSearch">
                <div
                    className={`nc-HeadBackgroundCommon h-24 2xl:h-28 top-0 left-0 right-0 w-full bg-primary-50 dark:bg-neutral-800/20 `}
                />
                <div className="container">
                    <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
                        <div className="relative w-full ">
                            <label
                                htmlFor="search-input"
                                className="text-neutral-500 dark:text-neutral-300"
                            >
                                <span className="sr-only">Search all icons</span>
                                <Input
                                    className="shadow-lg border-0 dark:border"
                                    id="search-input"
                                    type="search"
                                    defaultValue={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="عبارت مورد نظر خود را جستجو کنید"
                                    sizeClass="pr-14 py-5 pl-5 md:pr-16"
                                    rounded="rounded-full"
                                />
                                <ButtonCircle
                                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                                    size=" w-11 h-11"
                                    type="submit"
                                    onClick={changeQueryHandle}
                                >
                                    <i className="las la-arrow-right text-xl"></i>
                                </ButtonCircle>
                                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                      d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                  <path
                      d="M22 22L20 20"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                  />
                </svg>
              </span>
                            </label>
                        </div>
                    </header>
                </div>

                <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
                    <main>
                        {/* FILTER */}


                        {/* LOOP ITEMS */}
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {products?.data?.map((item, index) => (
                                    <ProductCardNew data={item} key={index}/>
                                )
                            )
                            }
                        </div>

                        {/* PAGINATION */}
                        <div
                            className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                            <AdminPagination
                                currentPage={products?.meta?.current_page as number}
                                totalPages={products?.meta?.last_page as number}
                                onPageChange={(n) => {
                                    changePageHandle(n)
                                }}/>
                        </div>
                    </main>

                </div>
            </div>
        </>
    );
};

export default PageSearch;
