import React, {FC} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import explore1Svg from "@/images/collections/explore1.svg";
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";
import {Route} from "next";

export interface CardCategory4Props {
    className?: string;
    featuredImage?: StaticImageData | string;
    bgSVG?: string;
    name: string;
    color?: string;
    url?: string;
}

const CardCategory4: FC<CardCategory4Props> = ({
                                                   className = "",
                                                   featuredImage = ".",
                                                   bgSVG = explore1Svg,
                                                   name,
                                                   color = "bg-rose-50",
                                                   url,
                                               }) => {
    return (
        <div
            className={`nc-CardCategory4 relative w-full aspect-w-12 aspect-h-16 sm:aspect-h-13 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
        >
            <div>
                <div className="hidden  absolute bottom-0 -left-40 max-w-[280px] opacity-80">
                    <Image src={bgSVG} alt=""/>
                </div>

                <div className="absolute inset-5 sm:inset-8 flex flex-col justify-between md:gap-10">
                    <div className="flex justify-center md:justify-center items-center">
                        <NcImage
                            alt=""
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${featuredImage}`}
                            containerClassName={`w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden z-0 ${color}`}
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

export default CardCategory4;
