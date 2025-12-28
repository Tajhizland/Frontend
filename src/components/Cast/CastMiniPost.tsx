import React from "react";
import {VlogResponse} from "@/services/types/vlog";
import Link from "next/link";
import {Route} from "next";
import NcImage from "@/shared/NcImage/NcImage";
import {FaCirclePlay} from "react-icons/fa6";
import {FaEye} from "react-icons/fa";
import {CastResponse} from "@/services/types/cast";

export default function CastMiniPost({
                                         casts
                                     }: { casts: CastResponse[] }) {
    return (<>
        <div
            className={`nc-WidgetCategories rounded-3xl overflow-hidden  bg-neutral-100 dark:bg-neutral-800`}
            data-nc-id="WidgetCategories"
        >
            <div
                className={`nc-WidgetHeading1 flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 dark:border-neutral-700  `}
            >
                <h2 className="text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow">
                    کست های پر بازدید
                </h2>

            </div>
            <div className="flow-root">
                <div
                    className="flex flex-col  bg-white dark:bg-black/20 divide-y divide-neutral-200 dark:divide-neutral-700 ">
                    {
                        casts.map((item, index) => (<Link
                            href={"/cast/" + item.url as Route}
                            key={index}
                            className={"flex items-center gap-1 py-2 px-1  hover:bg-neutral-100 dark:hover:bg-neutral-700"}>

                            <div className="relative rounded-xl overflow-hidden group shrink-0">

                                <NcImage
                                    containerClassName="flex  w-32 h-20 "
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/image/${item.image}`}
                                    className="object-contain w-full h-full "
                                    fill
                                    alt="vlog"
                                />
                            </div>
                            <span className="py-2.5 px-2 dark:text-white text-xs">{item.title}</span>

                        </Link>))
                    }
                </div>
            </div>
        </div>
    </>)
}
