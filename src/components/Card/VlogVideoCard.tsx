import React, {FC} from "react";
import Link from "next/link";
import {stripHTML} from "@/hooks/StripHtml";
import {VlogResponse} from "@/services/types/vlog";
import MetaCard from "@/components/Card/MetaCard";

export interface Card12Props {
    className?: string;
    data: VlogResponse
}

const VlogVideoCard: FC<Card12Props> = ({className = "h-full", data}) => {
    return (
        <div className={` group relative flex flex-col ${className}`}>

            <video
                className="w-full h-auto"
                controls
            >
                <source src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data.video}`} type="video/mp4"/>
            </video>


            <div className=" mt-8  flex flex-col">
                <h2
                    className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
                >
                    <Link
                        aria-label={"vlog"}
                        href={{pathname: "/vlog/" + data.url}}
                        className="line-clamp-2 capitalize"
                        title={"vlog"}
                    >
                        {data.title}
                    </Link>
                </h2>
                <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">
               <div dangerouslySetInnerHTML={{__html: stripHTML(data.description)}}/>

          </span>
        </span>
                <MetaCard  date={data.created_at} author={data.author}  className="mt-5"/>
            </div>
        </div>
    );
};

export default VlogVideoCard;
