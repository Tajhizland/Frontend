import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import explore1Svg from "@/images/collections/explore1.svg";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Route } from "next";

export interface CardCategory6Props {
  className?: string;
  featuredImage?: string | StaticImageData;
  bgSVG?: string;
  name: string;
  url: string;
  color?: string;
}

const CardCategory6: FC<CardCategory6Props> = ({
  className = "",
  featuredImage = ".",
  bgSVG = explore1Svg,
  name,
  url,
   color = "bg-rose-50",
}) => {
  return (
    <div
      className={`nc-CardCategory6 relative w-full aspect-w-3 aspect-h-4 h-0 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 group hover:nc-shadow-lg transition-shadow ${className}`}
    >
      <div>
        <div className="absolute bottom-0 right-0 top-0 opacity-10">
          <Image src={bgSVG} alt="" />
        </div>

        <div className="absolute inset-5 flex flex-col justify-center gap-y-5 items-center">
          <div className="flex justify-center items-center w-20 h-20 lg:w-32 lg:h-32">
            <NcImage
              alt=""
              width={680}
              height={680}
              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${featuredImage}`}
              containerClassName={` w-20 h-20 lg:w-32 lg:h-32 rounded-full overflow-hidden z-0 ${color}`}
            />
          </div>

          <div className="text-center">

            <h2 className={`text-xs sm:text-base font-semibold dark:text-white`}>{name}</h2>
          </div>
        </div>
      </div>

      <Link
        href={("/category/" + url) as Route}
      ></Link>
    </div>
  );
};

export default CardCategory6;
