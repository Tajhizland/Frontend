import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import { StaticImageData } from "next/image";
import {Route} from "next";

export interface CardCategory2Props {
  className?: string;
  ratioClass?: string;
  bgClass?: string;
  featuredImage?: string | StaticImageData;
  name: string;
  desc: string;
    url?: string;
}

const CardCategory2: FC<CardCategory2Props> = ({
  className = "",
  ratioClass = "aspect-w-1 aspect-h-1",
  bgClass = "bg-orange-50",
  featuredImage = ".",
  name,
  desc,
  url,
}) => {
  return (
    <Link
      href={`/brand/${url}` as Route}
      className={`nc-CardCategory2 ${className}`}
      data-nc-id="CardCategory2"
      aria-label={"brand"}

    >
      <div
        className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group ${ratioClass} ${bgClass}`}
      >
        <div className=" ">
          <NcImage
            alt=""
            containerClassName="w-full h-full flex justify-center"
             src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${featuredImage}`}

            className="object-cover rounded-2xl w-full h-full"

            width={720}
            height={720}
          />
        </div>
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity rounded-2xl"></span>
      </div>
      <div className="mt-5 flex-1 text-center">
        <h2 className="text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-semibold">
          {name}
        </h2>
        <span className="block mt-0.5 sm:mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
          {desc}
        </span>
      </div>
    </Link>
  );
};

export default CardCategory2;
