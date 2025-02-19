import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import { StaticImageData } from "next/image";
import {Route} from "next";

export interface BrandCardProps {
    className?: string;
    ratioClass?: string;
    bgClass?: string;
    featuredImage?: string | StaticImageData;
    name: string;
    url?: string;
}

const BrandCard: FC<BrandCardProps> = ({
                                                   className = "",
                                                   ratioClass = "aspect-w-3 aspect-h-2",
                                                   bgClass = "bg-orange-50",
                                                   featuredImage = ".",
                                                   name,
                                                   url,
                                               }) => {
    return (
        <Link
            href={`/brand/${url}` as Route}
            className={`${className}`}
            data-nc-id="BrandCard"
            aria-label={"brand"}

        >
            <div
                className={` relative w-full h-0 rounded-2xl overflow-hidden group ${ratioClass} `}
            >
                <div className="flex justify-center items-center">
                    <NcImage
                        alt=""
                        containerClassName="w-full h-full flex justify-center"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${featuredImage}`}

                        className="object-contain rounded-2xl w-full h-full"

                        width={720}
                        height={720}
                    />
                </div>
                <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity rounded-2xl"></span>
            </div>
            <div className="mt-5  text-center">
                <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold">
                    {name}
                </h2>
            </div>
        </Link>
    );
};

export default BrandCard;
