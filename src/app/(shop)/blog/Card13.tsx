import React, {FC, ReactNode} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import { _getImgRd, _getTitleRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";
import {NewsResponse} from "@/services/types/news";
import {Route} from "next";
import {stripHTML} from "@/hooks/StripHtml";

export interface Card13Props {
  className?: string;
  data : NewsResponse;
}

const Card13: FC<Card13Props> = ({ className = "" , data }) => {

  return (
    <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
      <div className="flex flex-col h-full py-2">
        <h2 className={`nc-card-title block font-semibold text-base`}>
          <Link
              href={"/news/show/"+data.url as Route}
            className="line-clamp-2 capitalize"
            title={"title"}
          >
              {data.title}

          </Link>
        </h2>
        <span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400 ">
          <span className="line-clamp-2">
               <div dangerouslySetInnerHTML={{__html: stripHTML(data.content)}}/>

          </span>
        </span>
          <span className="mt-4 block sm:hidden text-sm text-slate-500 ">
          {data.created_at}
        </span>
        <div className="mt-auto hidden sm:block">
          <PostCardMeta />
        </div>
      </div>

      <Link
        href={"/news/show/"+data.url as Route}
        aria-label={"news"}
        className={`block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 mr-3 sm:mr-5`}
      >
        <NcImage
          alt=""
          src={"https://tajhizland.com/upload/"+data.img}
          containerClassName="absolute inset-0"
          className="object-cover w-full h-full rounded-xl sm:rounded-3xl"
          sizes="400px"
          fill
        />
      </Link>
    </div>
  );
};

export default Card13;
