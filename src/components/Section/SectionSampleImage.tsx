"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import Link from "next/link";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import {IoIosArrowDropleftCircle } from "react-icons/io";
import CollectionProductCard from "@/components/Card/CollectionProductCard";
import NcImage from "@/shared/NcImage/NcImage";
import {SampleImageResponse} from "@/services/types/sampleImage";

export interface SectionSpecialSliderProps {
    className?: string;
    itemClassName?: string;
    cardStyle?: "style1" | "style2";
    data : SampleImageResponse[];
}

const SectionSampleImage: FC<SectionSpecialSliderProps> = ({
                                                                 className = "",
                                                                 cardStyle = "style2",
                                                                 data
                                                             }) => {
    const sliderRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            direction:"rtl",

            perView: 8.5,
            gap: 32,
            bound: true,
            breakpoints: {
                1280: {
                    gap: 28,
                    perView: 8.5,
                },
                1024: {
                    gap: 20,
                    perView: 7.5,
                },
                768: {
                    gap: 10,
                    perView:5.5,
                },

                500: {
                    gap: 10,
                    perView: 3.5,
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
                <Heading isCenter={false} href="/special" hasNextPrev>
                 </Heading>
                <div className="glide__track" data-glide-el="track"  style={{direction:"rtl"}}>
                    <ul className="glide__slides">
                        {data.map((image, index) => (
                            <li className={`glide__slide`} key={index}>
                                <NcImage
                                    containerClassName="flex aspect-w-2 aspect-h-1 w-full h-0"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/sample/${image.image}`}

                                    className="object-cover w-full h-full drop-shadow-xl"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                    alt="product"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SectionSampleImage;
