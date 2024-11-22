"use client";

import React, {useEffect, useRef, useState} from "react";
// @ts-ignore

// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import {EffectCoverflow, Pagination} from 'swiper/modules';
import {FaPlay} from "react-icons/fa";
import ModalGallery from "@/components/ModalGallery";

const VideoSwiper = ({
                         intro_video,
                         unboxing_video,
                         usage_video,
                     }: {
    intro_video: string;
    unboxing_video: string;
    usage_video: string;
}) => {
    const [openVideo, setOpenVideo] = useState("");
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <ModalGallery
                isOpenProp={openModal}
                CloseModal={
                    () => {
                        setOpenModal(false)
                    }
                }>
                <div className="relative"  >
                    <div
                        className={`mt-0   nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden w-full  aspect-w-16 aspect-h-9 `}>
                        <div className=" w-[80%] lg:w-[70%] h-full mx-auto flex justify-center items-center">
                            <video className="w-full h-auto object-cover" controls>
                                <source src={openVideo} type="video/mp4"/>
                            </video>
                        </div>
                    </div>
                </div>
            </ModalGallery>
            <Swiper
                effect={'coverflow'}
                loop={true}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.5}
                navigation={true}

                coverflowEffect={{
                    rotate: 45,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative flex justify-center">

                        <div className="cursor-auto w-full max-w-lg">
                            <video className="w-full h-auto">
                                <source src={unboxing_video} type="video/mp4"/>
                            </video>
                        </div>
                        <div>
                            <div className={"text-center"}>
                            </div>
                        </div>
                        <div onClick={() => {
                            setOpenVideo(unboxing_video);
                            setOpenModal(true)
                        }}
                             className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65 flex flex-col gap-y-2 justify-center items-center rounded">
                            <FaPlay className="text-white w-5 h-5 lg:w-12 lg:h-12"/>
                            <span className={"text-xs lg:text-lg text-white"}>آنباکس</span>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative flex justify-center">

                        <div className="cursor-auto w-full max-w-lg">
                            <video className="w-full h-auto">
                                <source src={intro_video} type="video/mp4"/>
                            </video>
                        </div>
                        <div>
                            <div className={"text-center"}>
                            </div>
                        </div>
                        <div onClick={() => {
                            setOpenVideo(intro_video);
                            setOpenModal(true)
                        }}
                             className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65 flex flex-col gap-y-2 justify-center items-center rounded">
                            <FaPlay className="text-white w-5 h-5 lg:w-12 lg:h-12"/>
                            <span className={"text-xs lg:text-lg text-white"}>معرفی محصول</span>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative flex justify-center">
                        <div className="cursor-auto w-full max-w-lg">
                            <video className="w-full h-auto">
                                <source src={usage_video} type="video/mp4"/>
                            </video>
                        </div>
                        <div className={"text-center"}>
                        </div>
                        <div onClick={() => {
                            setOpenVideo(usage_video);
                            setOpenModal(true)
                        }}
                             className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-65 flex flex-col gap-y-2 justify-center items-center rounded">
                            <FaPlay className="text-white w-5 h-5 lg:w-12 lg:h-12"/>
                            <span className={"text-xs lg:text-lg text-white"}>طریقه استفاده</span>

                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default VideoSwiper;
