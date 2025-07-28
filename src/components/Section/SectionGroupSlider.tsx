"use client";

import React, {FC, useEffect, useId, useRef, useState} from "react";
import Heading from "@/components/Heading/Heading";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import {ProductResponse} from "@/services/types/product";
import GroupCard from "@/components/Card/GroupCard";

export interface SectionSliderProductCardProps {
    className?: string;
    itemClassName?: string;
    data?: ProductResponse[];
}

const SectionGroupSlider: FC<SectionSliderProductCardProps> = ({
                                                                   className = "",
                                                                   itemClassName = "",
                                                                   data
                                                               }) => {
    const sliderRef = useRef(null);

    //
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            direction: "rtl",
            autoplay: 3000,
            perView: 5.0,
            gap: 10,
            bound: true,
            breakpoints: {
                1280: {
                    perView: 4.0,
                },
                1024: {
                    gap: 10,
                    perView: 2.2,
                },
                768: {
                    gap: 10,
                    perView: 2.2,
                },
                640: {
                    gap: 10,
                    perView: 2.4,
                },
                500: {
                    gap: 10,
                    perView: 2.1
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
        <div className={`nc-SectionSliderProductCard w-full ${className}`}>
            <div ref={sliderRef} className={`flow-root w-full`}>
                <div className={"bg-stone-100 p-5 rounded-2xl relative "}>
                    <div className="glide__track " data-glide-el="track" style={{direction: "rtl"}}>
                        <ul className="glide__slides  flex-grow flex items-center">
                            {data && data.map((item, index) => (
                                <li key={index}
                                    className={`glide__slide  rounded-3xl overflow-hidden ${itemClassName}`}>
                                    <GroupCard
                                        featuredImage={`${item?.images?.data[0]?.url}`}
                                        imageBaseUrl={"product"}
                                        name={item.name ?? ""}
                                        url={item.url ?? ""}
                                        key={item.id}
                                        item={item}
                                        color={"bg-orange-50"}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SectionGroupSlider;
