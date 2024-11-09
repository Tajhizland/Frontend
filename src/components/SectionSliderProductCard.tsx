"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard2 from "./ProductCard";
import { Product, PRODUCTS } from "@/data/data";
import { ProductResponse } from "@/services/types/product";
import {PopularProductResponse} from "@/services/types/popularProduct";
import Link from "next/link";

export interface SectionSliderProductCardProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  headingFontClassName?: string;
  headingClassName?: string;
  subHeading?: string;
  data?: PopularProductResponse[];
}

const SectionSliderProductCard: FC<SectionSliderProductCardProps> = ({
  className = "",
  itemClassName = "",
  headingFontClassName,
  headingClassName,
  heading,
  subHeading = "REY backpacks & bags",
  data
}) => {
  const sliderRef = useRef(null);

  //
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 4,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          perView: 4 - 1,
        },
        1024: {
          gap: 20,
          perView: 4 - 1,
        },
        768: {
          gap: 20,
          perView: 4 - 2,
        },
        640: {
          gap: 10,
          perView: 2.2,
        },
        500: {
          gap: 10,
          perView: 2,
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

  return (
    <div className={`nc-SectionSliderProductCard ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading
          className={headingClassName}
          fontClass={headingFontClassName}
          rightDescText={subHeading}
          hasNextPrev
        >
          {heading || `New Arrivals`}
        </Heading>
        <div className="glide__track" data-glide-el="track"  style={{direction:"ltr"}}>
            <ul className="glide__slides">
                {data && data.map((item, index) => (
                    <li key={index} className={`glide__slide ${itemClassName}`}>
                        <ProductCard2 data={item.product}/>
                    </li>
                ))}
                <li className={`glide__slide   `}>
                    <Link href={"/product/discounted"} className="block relative group">
                        <div className="relative rounded-2xl overflow-hidden h-[410px]">
                            <div className="h-[410px] bg-black/5 dark:bg-neutral-800"></div>
                            <div className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
                                <div className="flex items-center justify-center relative">
                                    <span className="text-xl font-semibold">نمایش همه  </span>
                                    <svg
                                        className="absolute left-full w-5 h-5 ml-2 rotate-45 group-hover:scale-110 transition-transform"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M18.0701 9.57L12.0001 3.5L5.93005 9.57"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 20.4999V3.66992"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeMiterlimit="10"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <span className="text-sm mt-1">نمایش  تمام محصولات تخفیف دار</span>
                            </div>
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
};

export default SectionSliderProductCard;
