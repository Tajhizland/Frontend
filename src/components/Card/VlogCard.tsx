import React, {FC, ReactNode} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import {Route} from "next";
import {stripHTML} from "@/hooks/StripHtml";
import {VlogResponse} from "@/services/types/vlog";
import MetaCard from "@/components/Card/MetaCard";

export interface Card13Props {
    className?: string;
    data: VlogResponse;
}

const VlogCard: FC<Card13Props> = ({className = "", data}) => {

    return (
        <div className={`relative flex   sm:flex-row ${className}`}>
            <div className="flex flex-col h-full py-2">
                <h2 className={`nc-card-title block font-semibold text-base dark:text-white`}>
                    <Link
                        href={"/vlog/" + data.url as Route}
                        className="line-clamp-2 capitalize"
                        title={"title"}
                    >
                        {data.title}
                    </Link>
                </h2>
                <span className="sm:block my-3 text-slate-500 dark:text-slate-400 max-w-sm sm:max-w-2xl sm:min-w-[20rem]">
                    <span className="line-clamp-2 text-xs">
                        <div dangerouslySetInnerHTML={{__html: stripHTML(data.description)}}/>
                    </span>
                </span>

                <div className="mt-auto ">
                    <MetaCard date={data.created_at} author={data.author}/>
                </div>
            </div>

            <Link
                href={"/vlog/" + data.url as Route}
                aria-label={"vlog"}
                className="flex flex-col w-full  justify-center mr-5"
            >
                <div className="relative rounded-xl overflow-hidden group">
                    <NcImage
                        containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data.poster}`}
                        className="object-cover w-full h-full "
                        fill
                        alt="vlog"
                    />
                </div>
            </Link>
        </div>
    );
};

export default VlogCard;
