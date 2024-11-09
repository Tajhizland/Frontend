"use client";

import React, {useEffect, useRef, useState} from "react";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import Heading from "@/components/Heading/Heading";

const VideoSlider = ({intro_video, unboxing_video, usage_video}: {
    intro_video: string,
    unboxing_video: string,
    usage_video: string
}) => {
    const sliderRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
            perView: 1.6,
            gap: 25,
            bound: true,
            breakpoints: {
                1280: {
                    gap: 20,
                    perView: 1.5,
                },
                1279: {
                    gap: 10,
                    perView: 1.4,
                },
                1023: {
                    gap: 10,
                    perView: 1.3,
                },
                768: {
                    gap: 10,
                    perView: 1.2,
                },
                500: {
                    gap: 10,
                    perView: 1.2,
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
        <div className={"overflow-hidden whitespace-nowrap w-full"}>

        <div
            ref={sliderRef}

            className={`nc-DiscoverMoreSlider  ${
                isShow ? "" : "invisible"
            }`}
        >
            <div className="cursor-grabbing" data-glide-el="track" style={{direction: "ltr" }}>
                <ul className="glide__slides">
                    <li key={0} className={`glide__slide`}>
                        <div className={"cursor-auto"}>
                            <video controls>
                                <source src={intro_video} type="video/mp4"/>
                            </video>
                        </div>
                    </li>
                    <li key={1} className={`glide__slide`}>
                        <div className={"cursor-auto"}>
                            <video controls>
                                <source src={unboxing_video} type="video/mp4"/>
                            </video>
                        </div>
                    </li>
                    <li key={2} className={`glide__slide`}>
                        <div className={"cursor-auto"}>
                            <video controls>
                                <source src={usage_video} type="video/mp4"/>
                            </video>
                        </div>
                    </li>
                </ul>
            </div>
            <Heading
                className="mt-12 lg:mt-14 text-neutral-900 dark:text-neutral-50 !justify-center "
                desc=""
                rightDescText=""
                hasNextPrev
            >
                {/*دسته‌بندی های پرطرفدار*/}
            </Heading>
        </div>

        </div>
    );
};

export default VideoSlider;
