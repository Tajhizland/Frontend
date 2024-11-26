"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm"; 
import ProductCard2 from "./ProductCardNew";
import { ProductResponse } from "@/services/types/product";

const LandingProductSlider = ({ data }: { data: ProductResponse[] }) => {
    const sliderRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            perView: 4.2,
            autoplay: 3000,
            gap: 25,
            bound: true,
            breakpoints: {
                1280: {
                    gap: 20,
                    perView: 3.8,
                },
                1279: {
                    gap: 10,
                    perView: 3.5,
                },
                1023: {
                    gap: 10,
                    perView: 3.3,
                },
                768: {
                    gap: 10,
                    perView: 2.8,
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
                                className={`relative w-full aspect-w-16 aspect-h-11 lg:aspect-h-9  rounded-2xl overflow-hidden group border`}
                            >
                                <ProductCard2 data={item} key={index} />
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LandingProductSlider;
