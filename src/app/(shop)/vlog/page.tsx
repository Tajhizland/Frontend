import { getVlogPaginated } from "@/services/api/shop/vlog"
import { VlogResponse } from "@/services/types/vlog";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import { Route } from "next";
import Link from "next/link";
import { it } from "node:test";
import { Fragment } from "react";


interface PageProps {
    searchParams: {
        page?: string;
    }
}

const renderItem = (item: VlogResponse) => {
    return <div>
          <Link href={item.url as Route}>
                <video
                    className="w-full h-auto"
                     muted
                    playsInline
                    preload="metadata"
                >
                    <source src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.video}`} type="video/mp4" />
                </video>
            </Link>
    </div>
}


export default async function Page({ searchParams }: PageProps) {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await getVlogPaginated(page);

    return (<>
        <div className={`nc-PageCollection`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    {/* HEADING */}
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            ولاگ تجهیزلند
                        </h2>
                       
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700" />
                    <main>
                        {/* TABS FILTER */}

                        {/* LOOP ITEMS */}
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {
                                response.data.map((item, index) => (<Fragment key={index}>
                                     {
                                        renderItem(item)
                                    }
                                </Fragment>))
                            }
                        </div>
 
                        <div
                            className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
                            <AdminPagination
                                currentPage={newResponse ? newResponse.products.meta?.current_page as number : response.meta?.current_page as number}
                                totalPages={newResponse ? newResponse.products.meta?.last_page as number : response.meta?.last_page as number}
                                onPageChange={(n) => {
                                    fetchData(filter, n)
                                }} />
                        </div>
                    </main>
                </div>
 
            </div>
        </div>
        
    </>)
}
