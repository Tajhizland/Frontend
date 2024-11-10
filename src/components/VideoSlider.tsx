"use client";

import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import Glide from "@glidejs/glide/dist/glide.esm";
import Heading from "@/components/Heading/Heading";

const VideoSlider = ({
                          intro_video,
                          unboxing_video,
                          usage_video,
                      }: {
    intro_video: string;
    unboxing_video: string;
    usage_video: string;
}) => {
    const sliderRef = useRef(null);
    const [isShow, setIsShow] = useState(false);

    const updateSlideScale = () => {
        const slides = document.querySelectorAll(".glide__slide");
        slides.forEach((slide) => {
            slide.classList.add("scale-50"); // کوچک کردن همه آیتم‌ها
        });

        const activeSlide = document.querySelector(".glide__slide--active");
        if (activeSlide) {
            activeSlide.classList.remove("scale-50"); // آیتم فعال به اندازه نرمال
        }
    };

    useEffect(() => {
        const OPTIONS: Partial<Glide.Options> = {
            type: "carousel",
            startAt: 1,
            focusAt: "center",
            perView: 3,
            gap: 32,
            bound: true,
            dragThreshold: 80,
            swipeThreshold: 40,
            breakpoints: {
                1280: {
                    gap: 28,
                    perView: 3,
                },
                1024: {
                    gap: 20,
                    perView: 3,
                },
                768: {
                    gap: 5,
                    perView: 2,
                },
                500: {
                    gap: 5,
                    perView: 1.7,
                },
            },
        };

        if (!sliderRef.current) return;

        const slider = new Glide(sliderRef.current, OPTIONS);
        slider.mount();
        setIsShow(true);

        // اعمال تنظیمات scale پس از mount
        updateSlideScale();

        // اضافه کردن افکت بزرگ‌تر به آیتم فعال پس از حرکت اسلایدر
        slider.on("run.after", updateSlideScale);

        return () => {
            slider.destroy();
        };
    }, []);

    return (
        <div className={`nc-SectionSliderLargeProduct`}>
            <div ref={sliderRef} className={`flow-root ${isShow ? "" : "invisible"}`}>
                <div
                    className="glide__track"
                    data-glide-el="track"
                    style={{ direction: "ltr" }}
                >
                    <ul className="glide__slides">
                        {/* آیتم اول */}
                        <li className="glide__slide flex flex-col justify-center items-center transition-transform duration-300">
                            <div className="cursor-auto w-full max-w-lg">
                                <video className="w-full h-auto" controls>
                                    <source src={intro_video} type="video/mp4" />
                                </video>
                            </div>
                            <div>
                                <div className={"text-center"}>
                                    <span className={"text-xs lg:text-sm"}>معرفی محصول</span>
                                </div>
                            </div>
                        </li>

                        {/* آیتم دوم */}
                        <li className="glide__slide flex flex-col justify-center items-center transition-transform duration-300">
                            <div className="cursor-auto w-full max-w-lg">
                                <video className="w-full h-auto" controls>
                                    <source src={unboxing_video} type="video/mp4" />
                                </video>
                            </div>
                            <div>
                                <div className={"text-center"}>
                                    <span className={"text-xs lg:text-sm"}>آنباکس</span>
                                </div>
                            </div>
                        </li>

                        {/* آیتم سوم */}
                        <li className="glide__slide flex flex-col justify-center items-center transition-transform duration-300">
                            <div className="cursor-auto w-full max-w-lg">
                                <video className="w-full h-auto" controls>
                                    <source src={usage_video} type="video/mp4" />
                                </video>
                            </div>
                            <div className={"text-center"}>
                                <span className={"text-xs lg:text-sm"}>طریقه استفاده</span>
                            </div>
                        </li>
                    </ul>
                </div>

                <Heading isCenter={true} hasNextPrev
                         className="mt-12 lg:mt-14 text-neutral-900 !justify-center "
                         >
                    {" "}
                </Heading>
            </div>
        </div>
    );
};

export default VideoSlider;
