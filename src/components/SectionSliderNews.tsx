"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard2 from "./ProductCard";
import { ProductResponse } from "@/services/types/product";
import { NewsResponse } from "@/services/types/news";
import Card13 from "@/app/(shop)/news/(blog)/Card13";
import Link from "next/link";
import { Route } from "next";
import NcImage from "@/shared/NcImage/NcImage";
import { FaEye } from "react-icons/fa";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string; 
  data?: NewsResponse[];
}

const SectionSliderNews: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "", 
  data
}) => {
  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl font-semibold">جدید ترین مقاله ها</h2>
        <ButtonSecondary href="/news">مشاهده همه</ButtonSecondary>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-5">
        {data && data.map((item, index) => (
          <li key={index} className={`  ${itemClassName}`}>

            <div className="w-full h-full rounded-xl overflow-hidden border bg-white dark:bg-transparent  hover:shadow  ">
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
      </ul>
    </div>
  );
};

export default SectionSliderNews;
