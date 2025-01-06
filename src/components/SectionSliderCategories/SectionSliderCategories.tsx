"use client";

import React, {FC, useEffect, useId, useRef, useState} from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import CardCategory2 from "@/components/CardCategories/CardCategory2";
import department1Png from "@/images/collections/department1.png";
import department2Png from "@/images/collections/department2.png";
import department3Png from "@/images/collections/department3.png";
import department4Png from "@/images/collections/department4.png";
import {StaticImageData} from "next/image";
import Link from "next/link";
import {BrandResponse} from "@/services/types/brand";
import {IoIosArrowDropleftCircle, IoIosArrowDroprightCircle} from "react-icons/io";
import NcImage from "@/shared/NcImage/NcImage";
import {Route} from "next";

export interface CardCategoryData {
    name: string;
    desc: string;
    img: string | StaticImageData;
    color?: string;
}

const CATS: CardCategoryData[] = [
    {
        name: "Travel Kits",
        desc: "20+ categories",
        img: department1Png,
        color: "bg-indigo-100",
    },
    {
        name: "Beauty Products",
        desc: "10+ categories",
        img: department2Png,
        color: "bg-slate-100",
    },
    {
        name: "Sport Kits",
        desc: "34+ categories",
        img: department3Png,
        color: "bg-sky-100",
    },
    {
        name: "Pets Food",
        desc: "12+ categories",
        img: department4Png,
        color: "bg-orange-100",
    },
];

export interface SectionSliderCategoriesProps {
    className?: string;
    itemClassName?: string;
    heading?: string;
    subHeading?: string;
    data: BrandResponse[];
}

const SectionSliderCategories: FC<SectionSliderCategoriesProps> = ({
                                                                       heading = "برند ها",
                                                                       subHeading = "",
                                                                       className = "",
                                                                       itemClassName = "",
                                                                       data,
                                                                   }) => {
    const sliderRef = useRef(null);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            direction:"rtl",

            perView: 6.4,
            gap: 32,
            bound: true,
            breakpoints: {
                1280: {
                    perView:  6.4,
                },
                1024: {
                    gap: 20,
                    perView: 5,
                },
                768: {
                    gap: 20,
                    perView: 4.9,
                },
                640: {
                    gap: 20,
                    perView: 4.8,
                },
                500: {
                    gap: 10,
                    perView: 3.8
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
        <div className={`nc-SectionSliderCategories ${className}`}>
            <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
                <Heading desc={subHeading} href="/brand" hasNextPrev>
                    {heading}
                </Heading>
                <div className="glide__track" data-glide-el="track" style={{direction: "rtl"}}>
                    <ul className="glide__slides items-center">
                        {data.map((item, index) => (
                            <li key={index} className={`glide__slide ${itemClassName}`}>
                                <Link href={"/brand/"+item.url as Route} title={item.name}>
                                    <NcImage
                                        alt={item.name}
                                        containerClassName="w-full h-full flex justify-center"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${item.image}`}
                                        className="object-cover rounded-2xl w-full h-full"
                                        width={720}
                                        height={720}
                                    />
                                </Link>
                            </li>
                        ))}

                        <li className={`glide__slide ${itemClassName}`}>
                            <div
                                className={`flex-1 relative w-full h-0 rounded-2xl overflow-hidden group aspect-w-1 aspect-h-1 bg-slate-100  dark:bg-black/20`}
                            >
                                <div>
                                    <div
                                        className="absolute inset-y-6 inset-x-10 flex flex-col sm:items-center justify-center">
                                        <div className="flex flex-col items-center justify-center relative gap-y-2 lg:gap-y-5">
                                            <IoIosArrowDropleftCircle className={"w-5 h-5 md:w-10 md:h-10 text-slate-900 dark:text-white"}/>
                                            <span
                                                className="text-xs lg:text-base font-semibold whitespace-nowrap text-neutral-800 dark:text-white">نمایش همه  </span>
                                        </div>

                                    </div>
                                </div>
                                <Link
                                    href={"/brand"}
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

export default SectionSliderCategories;
