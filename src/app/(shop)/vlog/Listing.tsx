//@ts-nocheck
"use client"
import {Fragment, useState} from "react";
import {useRouter} from "next/navigation";
import {getVlogPaginated} from "@/services/api/shop/vlog";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import {VlogResponse} from "@/services/types/vlog";
import Link from "next/link";
import {Route} from "next";

export default function Listing({response} )
{
    const [newResponse, setNewResponse] = useState();
    const router = useRouter();

    async function fetchData(page: number = 1) {
        router.push(`?page=${page}`);
        let data = await getVlogPaginated(page)
         setNewResponse(data);
    }

    const renderItem = (item: VlogResponse) => {
        return <div>
            <Link href={("/vlog/"+item.url) as Route}>
                <video
                    className="w-full h-auto"
                    muted
                    playsInline
                    preload="metadata"
                >
                    <source src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.video}`} type="video/mp4"/>
                </video>
            </Link>
        </div>
    }
    return(<>
        <div className={`nc-PageCollection`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            ولاگ تجهیزلند
                        </h2>

                    </div>

                    <hr className="border-slate-200 dark:border-slate-700"/>
                    <main>
                        {/* TABS FILTER */}

                        {/* LOOP ITEMS */}
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {
                                response.data.map((item:VlogResponse, index:number) => (<Fragment key={index}>
                                    {
                                        renderItem(item)
                                    }
                                </Fragment>))
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
