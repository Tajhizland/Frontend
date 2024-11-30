//@ts-nocheck
"use client"
import React, {Fragment, useState} from "react";
import {useRouter} from "next/navigation";
import {getVlogPaginated} from "@/services/api/shop/vlog";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import {VlogResponse} from "@/services/types/vlog";
import Link from "next/link";
import {Route} from "next";
import NcImage from "@/shared/NcImage/NcImage";
import Image from "next/image";
import {FaEye} from "react-icons/fa";
import VlogFilter from "@/app/(shop)/vlog/VlogFilter";
import {findCategoryByUrl} from "@/services/api/shop/category";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import WidgetFilter from "./WidgetFilter";

export default function Listing({response}) {
    const [newResponse, setNewResponse] = useState();
    const router = useRouter();
    const [filter, setFilter] = useState<string>("");
    const [page, setPage] = useState<number>(1);

    async function fetchMain(filters: string, page: number = 1) {
        router.push(`?page=${page}`);
        setFilter(filters);
        setPage(page)
        let data = await getVlogPaginated(page, filters)
        setNewResponse(data.data);
        // if (data?.meta?.last_page >= page + 1) {
        //     setHasMore(true);
        // }
        // setLoading(false)
    }

    async function fetchData(page: number = 1) {
        router.push(`?page=${page}`);
        let data = await getVlogPaginated(page)
        setNewResponse(data);
    }

    const renderItem = (item: VlogResponse) => {
        return <div className={"w-full h-full rounded-xl overflow-hidden border bg-white dark:bg-transparent"}>
            <Link
                href={"/vlog/" + item.url as Route}
                aria-label={"news"}
                className={`flex flex-col`}
            >
                <NcImage
                    containerClassName="flex aspect-w-1 aspect-h-1 w-full h-0"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.poster}`}
                    className="object-cover w-full h-full drop-shadow-xl"
                    fill
                    alt="vlog"
                />
                <span className={"py-2.5 px-2 dark:text-white"}>
                    {item.title}
                </span>

                <div className={"flex justify-between items-center py-1 px-2 text-neutral-500 dark:text-white"}>
                    <div className={"flex items-center gap-x-2 "}>
                        <FaEye/>
                        <span className={""}>
                    {item.view}
                </span>
                    </div>
                    <span className={"text-xs"}>
                        {item.created_at}
                    </span>
                </div>
                {/*<video*/}
                {/*    className="w-full h-auto"*/}
                {/*    muted*/}
                {/*    playsInline*/}
                {/*    preload="metadata"*/}
                {/*>*/}
                {/*    <source src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.video}`} type="video/mp4"/>*/}
                {/*</video>*/}
            </Link>
        </div>
    }
    return (<>
        <div className={`nc-PageCollection dark:bg-neutral-900`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                             تجهیزلند ولاگ
                        </h2>

                    </div>
                     <main>
                        {/* TABS FILTER */}
                        <VlogFilter changeFilter={fetchMain}/>
                        {/* LOOP ITEMS */}
                        <div className="grid grid-cols-1 lg:grid-cols-12  mt-8 lg:mt-10 gap-10">

                        <div className="hidden lg:block lg:col-span-3">
                            <WidgetFilter changeFilter={fetchMain} /> 
                        </div>

                        <div
                            className="grid lg:col-span-9  grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10">
                            {
                                newResponse ?
                                    newResponse.map((item: VlogResponse, index: number) => (<Fragment key={index}>
                                        {
                                            renderItem(item)
                                        }
                                    </Fragment>))
                                    :
                                    response.data.map((item: VlogResponse, index: number) => (<Fragment key={index}>
                                        {
                                            renderItem(item)
                                        }
                                    </Fragment>))
                            }
                        </div>
                     
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
