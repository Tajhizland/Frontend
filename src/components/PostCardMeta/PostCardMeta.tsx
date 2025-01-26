import React, {FC} from "react";
import {  FaUser} from "react-icons/fa";
import {IoIosCalendar} from "react-icons/io";

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
            className={`nc-PostCardMeta inline-flex items-center w-full flex-wrap text-neutral-800 dark:text-neutral-200 text-sm justify-between ${className}`}
            data-nc-id="PostCardMeta"
        >
            <div className={"flex items-center gap-1"}>
                <FaUser className={"text-neutral-600 w-4 h-4"} />
                <span  className="block text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                  {author != "" ? author : "مدیر سایت"}
              </span>
            </div>
                <div className={"flex items-center gap-1"}>
                    <IoIosCalendar  className={"text-neutral-600 w-4 h-4"} />
                    <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
                        {date}
                    </span>
                </div>
        </div>
    );
};

export default PostCardMeta;
