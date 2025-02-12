import React, {FC, ReactNode} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import { _getImgRd, _getTitleRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";
import {NewsResponse} from "@/services/types/news";
import {Route} from "next";
import {stripHTML} from "@/hooks/StripHtml";
import {VlogResponse} from "@/services/types/vlog";

export interface Card13Props {
  className?: string;
  data : VlogResponse;
}

const Card13: FC<Card13Props> = ({ className = "" , data }) => {

  return (
    <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
      <div className="flex flex-col h-full py-2">
        <h2 className={`nc-card-title block font-semibold text-base dark:text-white`}>
          <Link
              href={"/vlog/"+data.url as Route}
            className="line-clamp-2 capitalize"
            title={"title"}
          >
              {data.title}

          </Link>
        </h2>
        <span className="  sm:block my-3 text-slate-500 dark:text-slate-400 ">
          <span className="line-clamp-2 text-xs">
               <div dangerouslySetInnerHTML={{__html: stripHTML(data.description)}}/>

          </span>
        </span>
          <span className="mt-4 block sm:hidden text-sm text-slate-500 ">
          {data.created_at}
        </span>
        <div className="mt-auto hidden sm:block">
          <PostCardMeta date={data.created_at} author={data.author} />
        </div>
      </div>

        <Link
            href={"/vlog/" + data.url as Route}
            aria-label={"vlog"}
            className="flex flex-col w-full mr-5"
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

export default Card13;
