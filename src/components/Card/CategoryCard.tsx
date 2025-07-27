import React, {FC} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {Route} from "next";

export interface CardCategoryProps {
    className?: string;
    featuredImage?: StaticImageData | string;

    name: string;
    color?: string;
    imageBaseUrl?: string;
    url?: string;
}

const CardCategory: FC<CardCategoryProps> = ({
                                                   className = "",
                                                   featuredImage = ".",
    imageBaseUrl="category",
                                                   name,
                                                   color = "bg-rose-50",
                                                   url,
                                               }) => {
    return (
        <div
            className={`nc-CardCategory  relative w-full aspect-w-10 aspect-h-14  sm:aspect-w-11 sm:aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
        >
            <div>


                <div className="absolute  inset-1  sm:inset-8 flex flex-col justify-between gap-2 md:gap-1 ">
                    <div className="flex justify-center md:justify-center items-center">
                        <NcImage
                            alt=""
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageBaseUrl}/${featuredImage}`}
                            containerClassName={`w-20 h-20 sm:w-[6rem] sm:h-[6rem] rounded-full overflow-hidden z-0 ${color}`}
                            width={80}
                            height={80}
                        />
                        {/*<span className="text-xs text-slate-700 dark:text-neutral-300 font-medium">*/}
                        {/*  {count} products*/}
                        {/*</span>*/}
                    </div>

                    <div className="">

                        <h2 className={`text-xs md:text-xl md:font-semibold text-center dark:text-white `}>{name}</h2>
                    </div>

                    <Link
                        href={"/category/" + url as Route}
                        className="flex items-center text-xs font-medium group-hover:text-primary-500 transition-colors justify-center gap-x-2  dark:text-white"
                    >
                        <ArrowRightIcon className="w-4 h-4 "/>

                        <span>مشاهده  </span>
                    </Link>
                </div>
            </div>

            <Link aria-label={"category"}  href={"/category/" + url as Route} ></Link>
        </div>
    );
};

export default CardCategory;
