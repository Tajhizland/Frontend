"use client";

import React, {FC, useEffect, useId, useRef, useState} from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import {StaticImageData} from "next/image";
import Link from "next/link";
import {BrandResponse} from "@/services/types/brand";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import NcImage from "@/shared/NcImage/NcImage";
import {Route} from "next";
import {TrustedBrandResponse} from "@/services/types/trustedBrand";

export interface CardCategoryData {
    name: string;
    desc: string;
    img: string | StaticImageData;
    color?: string;
}

export interface SectionHomepageBrandProps {
    className?: string;
    itemClassName?: string;
    heading?: string;
    subHeading?: string;
    data: TrustedBrandResponse[];
}

const SectionTrustedBrand: FC<SectionHomepageBrandProps> = ({
                                                                heading = " برند هایی که به ما اعتماد کردن",
                                                                subHeading = "",
                                                                className = "",
                                                                itemClassName = "",
                                                                data,
                                                            }) => {
    const sliderRef = useRef(null);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            direction: "rtl",
            autoplay: 4000,
            type: "carousel",

            perView: 6.4,
            gap: 32,
            bound: true,
            breakpoints: {
                1280: {
                    perView: 6.4,
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
        <div className={` ${className}`}>
            <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
                <Heading desc={subHeading} href="/brand" hasNextPrev>
                    {heading}
                </Heading>
                <div className="glide__track" data-glide-el="track" style={{direction: "rtl"}}>
                    <ul className="glide__slides items-center">
                        {data.map((item, index) => (
                            <li key={index} className={`glide__slide ${itemClassName}`}>
                                <NcImage
                                    alt={"logo"}
                                    containerClassName="w-full h-full flex justify-center"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${item.logo}`}
                                    className="object-cover rounded-2xl w-full h-full"
                                    width={720}
                                    height={720}
                                />
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SectionTrustedBrand;
