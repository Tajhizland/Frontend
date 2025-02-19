"use client";

import React, { useEffect, useId, useRef, useState } from "react";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import { CategoryResponse } from "@/services/types/category";
import CategoryCard2 from "@/components/Card/CategoryCard2";
import Heading from "@/components/Heading/Heading";

const LandingCategorySlider = ({ data }: { data: CategoryResponse[] }) => {
    const sliderRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            direction:"rtl",
            perView: 4.5, 
            gap: 25,
            bound: true,
            peek: { before: 50, after: 0 },  

            breakpoints: {
                1280: {
                    gap: 20,
                    perView:4.6,
                },
                1279: {
                    gap: 10,
                    perView: 3.15,
                },
                1023: {
                    gap: 10,
                    perView: 2.6,
                },
                768: {
                    gap: 10,
                    perView: 2.2,
                },
                500: {
                    gap: 10,
                    perView: 1.5,
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

            className={`nc-DiscoverMoreSlider  ${isShow ? "" : "invisible"
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

            <div className="" data-glide-el="track" style={{ direction: "rtl" }}>
                <ul className="glide__slides">
                    {data.map((item, index) => (
                        <li key={index} className={`glide__slide`}>

                            <div
                                className={`relative w-full  rounded-2xl overflow-hidden group border`}
                            >
                                <CategoryCard2
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
