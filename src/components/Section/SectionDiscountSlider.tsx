"use client";

import React, {FC, useEffect, useId, useRef, useState} from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import {PopularProductResponse} from "@/services/types/popularProduct";
import Link from "next/link";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import ProductCard2 from "@/components/Card/ProductCard2";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Timer from "@/components/Timer/Timer";

export interface SectionSliderProductCardProps {
    className?: string;
    itemClassName?: string;
    heading?: string;
    headingFontClassName?: string;
    headingClassName?: string;
    subHeading?: string;
    timer?: string;
    data?: PopularProductResponse[];
}

const SectionDiscountSlider: FC<SectionSliderProductCardProps> = ({
                                                                      className = "",
                                                                      itemClassName = "",
                                                                      headingFontClassName,
                                                                      headingClassName = "pl-2",
                                                                      heading,
                                                                      subHeading = "REY backpacks & bags",
                                                                      timer,
                                                                      data
                                                                  }) => {
    const sliderRef = useRef(null);

    //
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            direction: "rtl",
            perView: 7.2,
            gap: 10,
            bound: true,
            breakpoints: {
                1280: {
                    perView: 7.2,
                },
                1024: {
                    gap: 10,
                    perView: 5.8,
                },
                768: {
                    gap: 10,
                    perView: 4.2,
                },
                640: {
                    gap: 10,
                    perView: 2.7,
                },
                500: {
                    gap: 10,
                    perView: 1.9
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
                <div className={"flex justify-end items-center"}>
                    {/*<div className={"flex items-center gap-2"}>*/}
                    {/*    <h2 className={"font-bold text-sm sm:text-xl"}>محصولات پر تخفیف</h2>*/}
                    {/*    <Link href={"/product/discounted"} className="block relative group">*/}
                    {/*        <ButtonPrimary>*/}
                    {/*            <div className="flex items-center relative gap-x-2">*/}
                    {/*                <span*/}
                    {/*                    className="text-xs sm:text-sm font-semibold whitespace-nowrap">مشاهده همه  </span>*/}
                    {/*            </div>*/}
                    {/*        </ButtonPrimary>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    <Heading
                        className={headingClassName}
                        fontClass={headingFontClassName}
                        rightDescText={subHeading}
                        hasNextPrev
                        href={"/product/discounted"}
                    >
                        {heading}
                    </Heading>


                </div>
                <div className={"bg-[#fcb415] p-5 rounded-2xl relative mt-5"}>
                    <div
                        className={"bg-[#fcb415] rounded-t-3xl absolute -top-[4.8rem] sm:-top-[4.3rem] sm:px-8 py-5 right-1 sm:right-[25%] md:right-[35%]"}>
                        <div className={"flex items-center gap-2 sm:gap-5"}>
                            <h2 className={"font-bold text-sm sm:text-lg"}>محصولات پر تخفیف</h2>
                            {timer && <Timer date={timer}/>}
                        </div>
                        <div className={"mt-1"}>
                            <Link href={"/product/discounted"} className="block relative group">
                                <div className="flex items-center relative gap-x-2">
                                    <span
                                        className="text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-800 ">نمایش همه  </span>
                                    <IoIosArrowDropleftCircle className={"w-4 h-4 text-slate-800 "}/>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="glide__track " data-glide-el="track" style={{direction: "rtl"}}>

                        <ul className="glide__slides  flex-grow flex items-center">
                            {data && data.map((item, index) => (
                                <li key={index}
                                    className={`glide__slide  rounded-3xl overflow-hidden ${itemClassName}`}>
                                    <ProductCard2 data={item.product}/>
                                </li>
                            ))}
                            <li className={`glide__slide ${itemClassName}`}>
                                <div
                                    className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group aspect-w-3 aspect-h-5 bg-slate-100  dark:bg-black/20`}
                                >
                                    <div>
                                        <div
                                            className="absolute inset-y-6 inset-x-10 flex flex-col sm:items-center justify-center">
                                            <div
                                                className="flex flex-col items-center justify-center relative gap-y-2 lg:gap-y-5">
                                                <IoIosArrowDropleftCircle
                                                    className={"w-5 h-5 md:w-10 md:h-10 text-slate-900 dark:text-white"}/>
                                                <span
                                                    className="text-xs lg:text-base font-semibold whitespace-nowrap text-neutral-800 dark:text-white">نمایش همه  </span>
                                            </div>

                                        </div>
                                    </div>
                                    <Link
                                        title={"all"}
                                        href={"/product/discounted"}
                                        className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"
                                    ></Link>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SectionDiscountSlider;
