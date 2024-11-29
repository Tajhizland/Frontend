"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import ProductCard2 from "./ProductCard";
import { ProductResponse } from "@/services/types/product";

const LandingProductSlider = ({ data }: { data: ProductResponse[] }) => {
    const sliderRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            perView: 4,
            gap: 32,
            bound: true,
            breakpoints: {
              1280: {
                perView: 4 - 1,
              },
              1024: {
                gap: 20,
                perView: 4 - 1,
              },
              768: {
                gap: 20,
                perView: 4 - 2,
              },
              640: {
                gap: 10,
                perView: 2.2,
              },
              500: {
                gap: 10,
                perView: 2,
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
