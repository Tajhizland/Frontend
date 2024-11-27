"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { CATS_DISCOVER } from "./CardCategories/data";
import { PopularCategoryResponse } from "@/services/types/popularCategory";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import { BannerResponse } from "@/services/types/banner";
import { CategoryResponse } from "@/services/types/category";
import CardCategory2 from "./CardCategories/CardCategory2";
import CardCategory4 from "./CardCategories/CardCategory4";
import CardCategory6 from "./CardCategories/CardCategory6";

const LandingCategorySlider = ({ data }: { data: CategoryResponse[] }) => {
    const sliderRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            perView: 4.8,
            gap: 25,
            bound: true,
            breakpoints: {
                1280: {
                    gap: 20,
                    perView: 4.5,
                },
                1279: {
                    gap: 10,
                    perView: 4.15,
                },
                1023: {
                    gap: 10,
                    perView: 3,
                },
                768: {
                    gap: 10,
                    perView: 2.5,
                },
                500: {
                    gap: 10,
                    perView: 2.5,
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
        <div
            ref={sliderRef}

            className={`nc-DiscoverMoreSlider nc-p-l-container ${isShow ? "" : "invisible"
                }`}
        >
            <Heading
                className="mb-3 lg:mb-5 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
                desc=""
                rightDescText=""
                hasNextPrev
            >
                {/*دسته‌بندی های پرطرفدار*/}
            </Heading>

            <div className="" data-glide-el="track" style={{ direction: "ltr" }}>
                <ul className="glide__slides">
                    {data.map((item, index) => (
                        <li key={index} className={`glide__slide`}>

                            <div
                                className={`relative w-full  rounded-2xl overflow-hidden group border`}
                            >
                                <CardCategory6
                                    url={item.url}
                                    key={index}
                                    name={item.name}
                                    featuredImage={item.image}
                                />
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LandingCategorySlider;
