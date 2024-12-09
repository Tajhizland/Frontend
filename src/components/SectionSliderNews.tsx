"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard2 from "./ProductCard";
import { ProductResponse } from "@/services/types/product";
import {NewsResponse} from "@/services/types/news";
import Card13 from "@/app/(shop)/news/(blog)/Card13";
import Link from "next/link";
import {Route} from "next";
import NcImage from "@/shared/NcImage/NcImage";
import {FaEye} from "react-icons/fa";
import {IoIosArrowDropleftCircle} from "react-icons/io";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: NewsResponse[];
}

const SectionSliderNews: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = " ",
  data
}) => {
  const sliderRef = useRef(null);

  //
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      direction:"rtl",
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 3.4,
        },
        1024: {
          gap: 20,
          perView: 3.2,
        },
        768: {
          gap: 20,
          perView: 3,
        },
        640: {
          gap: 20,
          perView: 2.5,
        },
        500: {
          gap: 20,
          perView: 1.9,
        },
      },
    };
    if (!sliderRef.current) return;

    let slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);
    {
        console.log("DATA IS ",data)
    }
  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          hasNextPrev
        >
          {heading }
        </Heading>
        <div className="glide__track" data-glide-el="track"  style={{direction:"rtl"}}>
            <ul className="glide__slides">
                {data && data.map((item, index) => (
                    <li key={index} className={`glide__slide ${itemClassName}`}>

                        <div className="w-full h-full rounded-xl overflow-hidden border bg-white dark:bg-transparent">
                            <Link
                                href={"/news/" + item.url as Route}
                                aria-label={"vlog"}
                                className="flex flex-col"
                            >
                                <NcImage
                                    containerClassName="flex aspect-w-1 aspect-h-1 w-full h-0"
                                    src={"https://tajhizland.com/upload/" + item.img}

                                    className="object-cover w-full h-full drop-shadow-xl"
                                    fill
                                    alt="vlog"
                                />
                                <span className="py-2.5 px-2 dark:text-white text-xs md:text:base">{item.title}</span>
                                <div
                                    className="flex justify-between items-center py-1 px-2 text-neutral-500 dark:text-white">

                                    <span className="text-xs">{item.created_at}</span>
                                </div>
                            </Link>
                        </div>

                    </li>
                ))}

                <li className={`glide__slide ${itemClassName}`}>
                    <div
                        className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group aspect-w-3 aspect-h-4 lg:aspect-w-4 lg:aspect-h-5 bg-slate-100  dark:bg-black/20`}
                    >
                        <div>
                            <div
                                className="absolute inset-y-6 inset-x-10 flex flex-col sm:items-center justify-center">
                                <div className="flex flex-col items-center justify-center relative gap-y-2 lg:gap-y-5">
                                    <IoIosArrowDropleftCircle
                                        className={"w-5 h-5 md:w-10 md:h-10 text-slate-900 dark:text-white"}/>
                                    <span
                                        className="text-xs lg:text-base font-semibold whitespace-nowrap text-neutral-800 dark:text-white">نمایش همه  </span>
                                </div>

                            </div>
                        </div>
                        <Link
                            href={"/news"}
                            className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"
                        ></Link>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderNews;
