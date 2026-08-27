"use client";
import React, {useState} from "react";
import {useFavorite} from "@/hooks/useFavorite";

interface props {
    like: boolean
    productId: number
}

const LikeSaveBtns = ({ like    , productId }: props) => {
    const [isLiked, setIsLiked] = useState(like);
    const {likeHandle} = useFavorite(productId);

    return (
        <div className="flow-root">
            <div className="flex text-slate-800 dark:text-neutral-300 text-sm -mx-3 -my-1.5">

                <span
                    className={` w-fit gap-2 flex items-center justify-center px-4 py-2 rounded-xl bg-white text-slate-800 cursor-pointer   text-sm z-10 `}
                    onClick={() => {
                        likeHandle(!isLiked)
                        setIsLiked(!isLiked)
                    }}
                >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${isLiked ? "text-red-500" : ""}`}
              fill={isLiked ? "currentColor" : `none`}
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span className="hidden sm:block text-slate-800 ">افزودن به علاقه مندی ها</span>
        </span>
            </div>
        </div>
    );
};

export default LikeSaveBtns;
