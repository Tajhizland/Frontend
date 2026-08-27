import React, {FC, ReactNode} from "react";
import VlogPoster from "@/components/Vlog/VlogPoster";
import Link from "next/link";
import {stripHTML} from "@/hooks/StripHtml";
import {VlogCardResponse} from "@/services/types/vlog";
import MetaCard from "@/components/Card/MetaCard";

export interface Card13Props {
    className?: string;
    data: VlogCardResponse;
}

const VlogCard: FC<Card13Props> = ({className = "", data}) => {
    if (!data) return null;

    return (
        <div className={`relative flex   sm:flex-row ${className}`}>
            <div className="flex flex-col h-full py-2">
                <h2 className={`nc-card-title block font-semibold text-base dark:text-white`}>
                    <Link
                        href={"/vlog/" + data.url}
                        className="line-clamp-2 capitalize"
                        title={"title"}
                    >
                        {data.title}
                    </Link>
                </h2>
                <span className="sm:block my-3 text-slate-500 dark:text-slate-400 max-w-sm sm:max-w-2xl min-w-[10rem] sm:min-w-[20rem]">
                    <span className="line-clamp-2 text-xs">
                        <div dangerouslySetInnerHTML={{__html: stripHTML(data.description)}}/>
                    </span>
                </span>

                <div className="mt-auto ">
                    <MetaCard date={data.created_at} author={data.author}/>
                </div>
            </div>

            <Link
                href={"/vlog/" + data.url}
                aria-label={"vlog"}
                className="flex flex-col w-full  justify-center mr-5"
            >
                <VlogPoster poster={data.poster} className="rounded-xl"/>
            </Link>
        </div>
    );
};

export default VlogCard;
