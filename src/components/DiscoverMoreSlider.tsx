"use client";

import React, {useEffect, useId, useRef, useState} from "react";
import Heading from "./Heading/Heading";
import CardCategory3 from "./CardCategories/CardCategory3";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import {CATS_DISCOVER} from "./CardCategories/data";
import {PopularCategoryResponse} from "@/services/types/popularCategory";
import Image from "next/image";
import Link from "next/link";
import {Route} from "next";
import {BannerResponse} from "@/services/types/banner";

const DiscoverMoreSlider = ({data}: { data: BannerResponse[] }) => {
    const sliderRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            direction:"rtl",
            perView: 4,
            autoplay: 3000,
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

            className={`nc-DiscoverMoreSlider nc-p-l-container lg:mr-52 ${
                isShow ? "" : "invisible"
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

            <div className="" data-glide-el="track" style={{direction: "rtl"}}>
                <ul className="glide__slides">
                    {data.map((item, index) => (
                        <li key={index} className={`glide__slide`}>
                            {/*<CardCategory3*/}
                            {/*    name={item.category?.name}*/}
                            {/*    url={item.category?.url}*/}
                            {/*    desc={item.category?.description}*/}
                            {/*    featuredImage={item.category?.image}*/}
                            {/*    index={index}*/}
                            {/*    color="bg-blue-50"*/}
                            {/*/>*/}
                            <div
                                className={`relative w-full aspect-w-16 aspect-h-11 lg:aspect-h-9  rounded-2xl overflow-hidden group border`}
                            >
                                <Link href={item.url as Route} title={"link"}>
                                    <Image
                                        alt=""
                                        fill
                                        className="w-full h-full object-cover"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banner/${item.image}`}
                                    />
                                </Link>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DiscoverMoreSlider;
