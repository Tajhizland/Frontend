import React, {FC} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import {_getImgRd, _getTitleRd} from "@/contains/fakeData";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import Link from "next/link";
import {Route} from "next";

export interface Card13Props {
    className?: string;
    title: string;
    description: string;
    date: string;
    image: string;
    url: string;
}

const Card13: FC<Card13Props> = ({className = "", title, description, image,date ,url}) => {
    return (
        <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
            <div className="flex flex-col h-full py-2">
                <h2 className={`nc-card-title block font-semibold text-base`}>
                    <Link
                        href={"/blog-single"}
                        className="line-clamp-2 capitalize"
                        title={"title"}
                    >
                        {title}
                    </Link>
                </h2>
                <span className="hidden sm:block my-3 text-slate-500 dark:text-slate-400 ">
          <span className="line-clamp-2">
           {description}
          </span>
        </span>
                <span className="mt-4 block sm:hidden text-sm text-slate-500 ">
          {date}
        </span>
                <div className="mt-auto hidden sm:block">
                    <PostCardMeta/>
                </div>
            </div>

            <Link
                href={"/blog"+url as Route}
                className={`block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5`}
            >
                <NcImage
                    alt=""
                    src={"https://tajhizland.com/upload/" + image}

                    // src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/blog/${image}`}
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
