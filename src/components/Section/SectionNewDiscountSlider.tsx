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
import ProductCard3 from "@/components/Card/ProductCard3";

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

const SectionNewDiscountSlider: FC<SectionSliderProductCardProps> = ({
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
            autoplay: 5000,

            breakpoints: {
                1280: {
                    perView: 5.3,
                },
                1024: {
                    gap: 10,
                    perView: 4.8,
                },
                780: {
                    gap: 10,
                    perView: 2.8,
                },
                640: {
                    gap: 10,
                    perView: 2.8,
                },
                500: {
                    gap: 10,
                    perView: 2.6
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

    const renderMobileHeader = () => {
        return <div className={"flex flex-col items-center border-b-2 border-dashed pb-10 relative"}>
            {/*<div className="absolute w-20 h-20 bg-white rounded-full left-1/2 -top-20 -translate-x-1/2 "></div>*/}
            <div className={"absolute w-10 h-10 bg-white rounded-full -left-6 -bottom-5 "}></div>
            <div className={"absolute w-10 h-10 bg-white rounded-full -right-6 -bottom-5 "}></div>

            <div className={"flex flex-col items-center gap-2"}>
                <div>
                    <strong className={"font-bold text-xl  "}>
                        پیشنهاد
                         محصولات
                         پرتخفیف تا
                    </strong>
                </div>
                <div className={"flex items-center gap-2"}>
                         <span className={"font-bold  text-4xl text-red-600"}>
                            % 20
                        </span>
                     <div>
                        {timer && <Timer date={timer} label={true}/>}
                    </div>
                </div>
            </div>
            <div className={"absolute -bottom-2 bg-[#fcb415]"}>
                <Link href={"/product/discounted"} className="block relative group">
                    <div className="flex items-center relative gap-x-2">
                                    <span
                                        className="text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-800 ">نمایش همه  </span>
                        <IoIosArrowDropleftCircle className={"w-4 h-4 text-slate-800 "}/>
                    </div>
                </Link>
            </div>
        </div>
    }
    const renderDesktopHeader = () => {
        return <div className={"flex flex-col items-center w-64 gap-5 border-l-4 border-dashed pl-5 relative"}>
            <div className={"absolute w-10 h-10 bg-white rounded-full -left-5 -top-10 hidden md:block"}></div>
            <div className={"absolute w-10 h-10 bg-white rounded-full -left-5 -bottom-10 hidden md:block"}></div>
            <div className={" "}>
                <strong className={"font-bold xl:text-2xl lg:text-xl text-center flex"}>
                    پیشنهاد
                    <br/>
                    محصولات
                    <br/>
                    پرتخفیف تا
                </strong>
            </div>
            <div>
                <strong className={"font-bold xl:text-6xl lg:text-5xl text-red-600"}>
                    % 20
                </strong>
            </div>
            <div>
                {timer && <Timer date={timer} label={true}/>}
            </div>
            <div className={"mt-5"}>
                <Link href={"/product/discounted"} className="block relative group">
                    <div className="flex items-center relative gap-x-2">
                                    <span
                                        className="text-xs sm:text-sm font-semibold whitespace-nowrap text-slate-800 ">نمایش همه  </span>
                        <IoIosArrowDropleftCircle className={"w-4 h-4 text-slate-800 "}/>
                    </div>
                </Link>
            </div>
        </div>

    }
    return (
        <div className={`nc-SectionSliderProductCard relative ${className}`}>

            <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>

                <div className={"bg-[#fcb415] py-5 lg:pr-10 rounded-2xl relative mt-5 flex lg:pl-4 flex-col lg:flex-row gap-5"}>
                    <div className="absolute w-20 h-20 bg-white rounded-full -right-14 top-1/2 -translate-y-1/2 hidden lg:block"></div>
                    <div className={"block lg:hidden"}>
                        {renderMobileHeader()}
                    </div>
                    <div className={"hidden lg:block"}>
                        {renderDesktopHeader()}
                    </div>
                     <div className="glide__track  pr-5 " data-glide-el="track" style={{direction: "rtl"}}>

                        <ul className="glide__slides  flex-grow flex items-center ">
                            {data && data.map((item, index) => (
                                <li key={index}
                                    className={`glide__slide  rounded-3xl overflow-hidden ${itemClassName}`}>
                                    <ProductCard3 data={item.product}/>
                                </li>
                            ))}
                            <li className={`glide__slide ${itemClassName}`}>
                                <div
                                    className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group aspect-w-4 aspect-h-7 bg-slate-100  dark:bg-black/20`}
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

export default SectionNewDiscountSlider;
