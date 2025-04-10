"use client";

import React, {FC} from "react";
// @ts-ignore
import {NewsResponse} from "@/services/types/news";
import Link from "next/link";
import {Route} from "next";
import NcImage from "@/shared/NcImage/NcImage";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import {stripHTML} from "@/hooks/StripHtml";
import MetaCard from "@/components/Card/MetaCard";

export interface SectionHomepageBlogProps {
    className?: string;
    itemClassName?: string;
    data?: NewsResponse[];
}

const SectionHomepageBlog: FC<SectionHomepageBlogProps> = ({
                                                                  className = "",
                                                                  itemClassName = "",
                                                                  data
                                                              }) => {
    return (
        <div
            className={`nc-SectionSliderProductCard bg-neutral-100/70 dark:bg-black/20  rounded-2xl sm:px-5 py-5 md:mx-10  ${className}`}>
            <div className={"container"}>
                <div className="flex justify-between items-center ">
                    <h2 className="text-lg md:text-2xl font-semibold">جدید ترین مقاله ها</h2>
                    <ButtonSecondary className={"hidden sm:block"} href="/news">مشاهده همه مقالات</ButtonSecondary>
                </div>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-5 mt-5">
                    {data && data.map((item, index) => (
                        <li key={index} className={`  ${itemClassName}`}>

                            <div
                                className="w-full h-full overflow-hidden hover:shadow bg-white dark:bg-transparent hover:text-black group border rounded">
                                <Link
                                    href={"/news/show/" + item.url as Route}
                                    aria-label={"vlog"}
                                    className="flex flex-col"
                                >
                                    <NcImage
                                        containerClassName="flex aspect-w-3 aspect-h-2 w-full h-0 rounded"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/blog/${item.img}`}
                                        className="object-fill w-full h-full rounded group-hover:opacity-80"
                                        fill
                                        alt="vlog"
                                    />
                                    <div className="flex flex-col gap-y-2 mt-2 p-2">
                                        <span
                                            className="  dark:text-white text-xs md:text:base text-slate-800 font-bold">{item.title}</span>
                                        <p className="line-clamp-2 text-xs text-slate-800 dark:text-neutral-200">
                                            {stripHTML(item.content)}
                                        </p>
                                        <MetaCard date={item.created_at} author={item.author}/>
                                    </div>
                                </Link>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex sm:hidden mt-5 justify-center">
                <ButtonSecondary href={"/news"}> مشاهده همه مقالات</ButtonSecondary>
            </div>
        </div>
    );
};

export default SectionHomepageBlog;
