import React, {FC, useMemo} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import {ArrowRightIcon} from "@heroicons/react/24/outline";
import {StaticImageData} from "next/image";
import Link from "next/link";
import {Route} from "next";
import {ProductResponse} from "@/services/types/product";
import Prices from "@/components/Price/Prices";
import {log} from "console";

export interface GroupCardProps {
    className?: string;
    featuredImage?: StaticImageData | string;
    name?: string;
    color?: string;
    imageBaseUrl?: string;
    url?: string;
    item: ProductResponse;
}

const GroupCard: FC<GroupCardProps> = ({
                                           className = "",
                                           featuredImage = ".",
                                           imageBaseUrl = "group",
                                           name,
                                           color = "bg-rose-50",
                                           url,
                                           item
                                       }) => {

    const renderMinPrice = () => {
        const allPrices =
            item?.groupItems?.data
                ?.flatMap(groupItem => groupItem.product?.colors.data || [])
                ?.map(color => color.price)
                ?.filter(price => typeof price === 'number');

        if (!allPrices || allPrices.length === 0) return null;
        return Math.min(...allPrices);
    };
    const renderMaxPrice = () => {
        const allPrices =
            item?.groupItems?.data
                ?.flatMap(groupItem => groupItem.product?.colors.data || [])
                ?.map(color => color.price)
                ?.filter(price => typeof price === 'number');

        if (!allPrices || allPrices.length === 0) return null;
        return Math.max(...allPrices);
    }
    const minPrice = useMemo(() => renderMinPrice(), [item]);
    const maxPrice = useMemo(() => renderMaxPrice(), [item]);
    return (
        <div
            className={`nc-CardCategory  relative w-full aspect-w-11 aspect-h-11 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
        >
            <div>
                <div className="absolute  inset-1  sm:inset-8 flex flex-col justify-between gap-2 md:gap-1 ">
                    <div className="flex justify-center md:justify-center items-center">
                        <NcImage
                            alt=""
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${imageBaseUrl}/${featuredImage}`}
                            containerClassName={`w-20 h-20 sm:w-[6rem] sm:h-[6rem] rounded-full overflow-hidden z-0 border ${color}`}
                            width={80}
                            height={80}
                        />
                    </div>

                    <div className="">
                        <h2 className={`text-xs md:text-xl md:font-semibold text-center dark:text-white `}>{name}</h2>
                    </div>

                    <div className={"flex justify-center gap-2"}>
                        <Prices price={minPrice??0}/>
                        <span className={"text-green-500"}>
                            تا
                        </span>
                        <Prices price={maxPrice??0}/>
                    </div>
                </div>
            </div>

            <Link aria-label={"category"} href={"/group/" + url as Route}></Link>
        </div>
    );
};

export default GroupCard;
