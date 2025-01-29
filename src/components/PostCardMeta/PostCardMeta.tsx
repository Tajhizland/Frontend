import React, {FC} from "react";
import {  FaUser} from "react-icons/fa";
import { CiClock1 } from "react-icons/ci";
export interface PostCardMetaProps {
    className?: string;
    hiddenAvatar?: boolean;
    date?: string;
    author?: string;

}

const PostCardMeta: FC<PostCardMetaProps> = ({
                                                 className = "leading-none",
                                                 hiddenAvatar = true,
                                                 date,
                                                 author
                                             }) => {
    return (
        <div
            className={`nc-PostCardMeta inline-flex items-center w-full flex-wrap text-[0.6rem] sm:text-xs justify-between gap-2 mt-2 ${className}`}
            data-nc-id="PostCardMeta"
        >
            <div className={"flex items-center gap-1"}>
                <FaUser className={"text-neutral-500 dark:text-neutral-300 w-4 h-4"} />
                <span  className="block text-neutral-500 dark:text-neutral-300">
                  {author != "" ? author : "مدیر سایت"}
              </span>
            </div>
                <div className={"flex items-center gap-1"}>
                    <CiClock1  className={"text-neutral-500 dark:text-neutral-300 w-4 h-4"} />
                    <span className="text-neutral-500 dark:text-neutral-300 font-normal line-clamp-1 ">
                        {date}
                    </span>
                </div>
        </div>
    );
};

export default PostCardMeta;
