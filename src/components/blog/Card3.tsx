import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Badge from "@/shared/Badge/Badge";
import { _getImgRd, _getTagNameRd, _getTitleRd } from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";
import { NewsResponse } from "@/services/types/news";
import {stripHTML} from "@/hooks/StripHtml";

export interface Card3Props {
  className?: string;
  item: NewsResponse;
}
const Card3: FC<Card3Props> = ({ className = "h-full", item }) => {
  return (
    <div
      className={`nc-Card3 relative flex flex-col-reverse sm:flex-row sm:items-center rounded-[40px] group ${className}`}
      data-nc-id="Card3"
    >

      <div
        className={`block flex-shrink-0 sm:w-56 sm:ml-6 rounded-3xl overflow-hidden mb-5 sm:mb-0`}
      >
        <Link
          href={{pathname:"/news/show/" +(item.url)}}
          className={`block w-full h-0 aspect-h-2  aspect-w-3 `}
        >
          <NcImage
            alt=""
            fill
            src={"https://tajhizland.com/upload/" + item.img}
            containerClassName="absolute inset-0"
            className="w-full"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="space-y-5 mb-4">
          <Badge name={"اخبار و مقالات"} />
          <div>
            <h2
              className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 text-xl`}
            >
              <Link
                  href={{pathname:"/news/show/" +(item.url)}}
                className="line-clamp-2 capitalize"
                title={"عنوان"}
              >
                {item.title}
              </Link>
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-base line-clamp-1">
                <div dangerouslySetInnerHTML={{ __html: stripHTML(item.content) }} />
              </span>
            </div>
          </div>
          <PostCardMeta date={item.created_at} author={item.author} />
        </div>
      </div>

    </div>
  );
};

export default Card3;
