import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import SocialsShare from "@/shared/SocialsShare/SocialsShare";
import { imgHigtQualitys, _getTitleRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";
import {NewsResponse} from "@/services/types/news";

export interface Card12Props {
  className?: string;
  data:NewsResponse
}

const Card12: FC<Card12Props> = ({ className = "h-full" , data }) => {
  return (
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      <Link
          href={{pathname:"/news/show/"+data.url}}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"
      >
        <NcImage
          src={"https://tajhizland.com/upload/"+data.img}
          containerClassName="absolute inset-0"
          alt={"title"}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </Link>


      <div className=" mt-8 pr-10 flex flex-col">
        <h2
          className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
        >
          <Link
              href={{pathname:"/news/show/"+data.url}}
            className="line-clamp-2 capitalize"
            title={"title"}
          >
              {data.title}
          </Link>
        </h2>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">
               <div dangerouslySetInnerHTML={{__html: data.content.replace(/<img[^>]*>/g, "")}}/>

          </span>
        </span>
          <PostCardMeta className="mt-5"/>
      </div>
    </div>
  );
};

export default Card12;
