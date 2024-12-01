"use client";

import React, { FC, useEffect, useId, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import CollectionCard from "./CollectionCard";
import CollectionCard2 from "./CollectionCard2";
import { DEMO_LARGE_PRODUCTS } from "./SectionSliderLargeProduct2";
import Link from "next/link";
import {ProductResponse} from "@/services/types/product";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import {IoIosArrowDroprightCircle} from "react-icons/io";

export interface SectionSliderLargeProductProps {
  className?: string;
  itemClassName?: string;
  cardStyle?: "style1" | "style2";
  data : SpecialProductResponse[];
}

const SectionSliderLargeProduct: FC<SectionSliderLargeProductProps> = ({
  className = "",
  cardStyle = "style2",
    data
}) => {
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      perView: 3,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1024: {
          gap: 20,
          perView: 2.5,
        },
        768: {
          gap: 10,
          perView: 2.3,
        },

        500: {
          gap: 10,
          perView: 2.0,
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

  const MyCollectionCard =
    cardStyle === "style1" ? CollectionCard : CollectionCard2;

  return (
    <div className={`nc-SectionSliderLargeProduct ${className}`}>
      <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
        <Heading isCenter={false} hasNextPrev>
          محصولات منحصر به فرد
        </Heading>
        <div className="glide__track" data-glide-el="track"  style={{direction:"ltr"}}>
            <ul className="glide__slides">
                {data.map((product, index) => (
                    <li className={`glide__slide`} key={index}>
                        <MyCollectionCard
                            name={product.product && product.product.name || ""}
                            price={product.product && product.product.min_price || 0}
                            imgs={product.product && product.product.images.data || undefined}
                            description={product.product && product.product.description || ""}
                            url={product.product && product.product.url || ""}
                            review={product.product?.comments.data.length}
                            rating={product.product?.rating ?? 0}
                        />
                    </li>
                ))}

                <li className={`glide__slide  h-auto `}>
                    <Link href={"/special"} className="block relative group">
                        <div className="relative flex flex-col rounded-2xl overflow-hidden">
                            <div className="relative">
                                <div className="aspect-w-8 aspect-h-5 bg-neutral-100/70   dark:bg-black/20"></div>
                                <div
                                    className="absolute inset-y-6 inset-x-10  flex flex-col items-center justify-center">
                                    <div className="flex flex-col items-center justify-center relative gap-y-2 lg:gap-y-10">
                                        <IoIosArrowDroprightCircle className={"w-10 h-10 text-slate-900 dark:text-white"}/>
                                        <span
                                            className="text-sm  lg:text-xl font-semibold whitespace-nowrap text-neutral-800 dark:text-white">نمایش همه  </span>
                                    </div>
                                </div>
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

export default SectionSliderLargeProduct;
