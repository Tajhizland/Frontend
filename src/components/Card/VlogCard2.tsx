import React, {FC, ReactNode} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import {Route} from "next";
import {stripHTML} from "@/hooks/StripHtml";
import {VlogResponse} from "@/services/types/vlog";
import MetaCard from "@/components/Card/MetaCard";
import {FaCirclePlay} from "react-icons/fa6";
import {FaEye} from "react-icons/fa";

export interface Card13Props {
    className?: string;
    data: VlogResponse;
}

const VlogCard2: FC<Card13Props> = ({className = "", data}) => {

    return (
        <div className="w-full h-full  overflow-hidden   bg-white dark:bg-transparent" key={data.id}>
            <Link
                href={"/vlog/" + data.url as Route}
                aria-label={"vlog"}
                className="flex flex-col"
            >
                <div className="relative rounded-xl overflow-hidden group">

                    <NcImage
                        containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data.poster}`}
                        className="object-cover w-full h-full "
                        fill
                        alt="vlog"
                    />
                    <div
                        className="absolute top-0 left-0 bg-black/70 w-full h-full group-hover:flex justify-center items-center hidden">
                        <FaCirclePlay className="text-white w-8 h-8 animate-pulse" />
                    </div>
                </div>
                <span className="py-2.5 px-2 dark:text-white">{data.title}</span>
                <div className="flex justify-between items-center py-1 px-2 text-neutral-500 dark:text-white">
                    <div className="flex items-center gap-x-2">
                        <FaEye />
                        <span>{data.view}</span>
                    </div>
                    <span className="text-xs">{data.created_at}</span>
                </div>
            </Link>
        </div>
    );
};

export default VlogCard2;
