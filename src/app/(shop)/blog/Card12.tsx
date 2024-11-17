import React, {FC} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import SocialsShare from "@/shared/SocialsShare/SocialsShare";
import {imgHigtQualitys, _getTitleRd} from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";
import {NewsResponse} from "@/services/types/news";
import {stripHTML} from "@/hooks/StripHtml";
import {VlogResponse} from "@/services/types/vlog";

export interface Card12Props {
    className?: string;
    data: VlogResponse
}

const Card12: FC<Card12Props> = ({className = "h-full", data}) => {
    return (
        <div className={`nc-Card12 group relative flex flex-col ${className}`}>
            {/*<Link*/}
            {/*    aria-label={"news"}*/}
            {/*    href={{pathname: "/vlog/" + data.url}}*/}
            {/*    className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"*/}
            {/*>*/}
            {/*    <NcImage*/}
            {/*        src={"https://tajhizland.com/upload/" + data.poster}*/}

            {/*        containerClassName="absolute inset-0"*/}
            {/*        alt={"title"}*/}
            {/*        fill*/}
            {/*        sizes="(max-width: 768px) 100vw, 50vw"*/}
            {/*    />*/}
            {/*</Link>*/}

            <video
                className="w-full h-auto"
                controls
            >
                <source src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${data.video}`} type="video/mp4"/>
            </video>


            <div className=" mt-8 pr-10 flex flex-col">
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
                <PostCardMeta className="mt-5"/>
            </div>
        </div>
    );
};

export default Card12;
