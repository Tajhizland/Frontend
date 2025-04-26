"use client";
import React, { useState, Fragment } from "react";
import { BsFillCameraReelsFill } from "react-icons/bs";
import VideoPlayer from "@/shared/VideoPlayer/VideoPlayer";
import { VlogResponse } from "@/services/types/vlog";
import NcImage from "@/shared/NcImage/NcImage";

export default function SectionVideo({
                                         intro_video,
                                         unboxing_video,
                                         usage_video,
                                     }: {
    intro_video?: VlogResponse;
    unboxing_video?: VlogResponse;
    usage_video?: VlogResponse;
}) {
    const videos = [
        {
            src: intro_video?.video ?? "",
            poster: intro_video?.poster ?? "",
            title: "معرفی محصول",
            description: intro_video?.title ?? "",
        },
        {
            src: usage_video?.video ?? "",
            poster: usage_video?.poster ?? "",
            title: "آماده به کار محصول",
            description: usage_video?.title ?? "",
        },
        {
            src: unboxing_video?.video ?? "",
            poster: unboxing_video?.poster ?? "",
            title: "آنباکس محصول",
            description: unboxing_video?.title ?? "",
        },
    ].filter((v) => v.src !== ""); // فقط ویدیوهای موجود رو نگه دار

    const [currentVideo, setCurrentVideo] = useState(() => {
        return videos[0] || { src: "", poster: "", title: "", description: "" };
    });

    if (videos.length === 0) return <></>; // اگر هیچ ویدیویی نبود هیچی نشون نده

    return (
        <div className="flex flex-col-reverse xl:flex-row gap-5">

            {/* لیست ویدیوها */}
            <div className="flex flex-col md:flex-row lg:flex-col gap-10">
                {videos.length > 1 &&
                    videos.map((item, index) => (
                        <Fragment key={index}>
                            <div
                                onClick={() => setCurrentVideo(item)}
                                className="bg-neutral-100 hover:bg-neutral-200 dark:bg-black/20 dark:hover:bg-black/30 rounded flex gap-x-2 w-full xl:w-64 cursor-pointer overflow-hidden"
                            >
                                <div className="flex-shrink-0 w-32">
                                    <NcImage
                                        containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.poster}`}
                                        className="object-cover w-full h-full drop-shadow-xl"
                                        fill
                                        alt="vlog"
                                    />
                                </div>

                                <div className="flex flex-col justify-between w-fit whitespace-nowrap flex-1 py-2">
                                    <div className="flex items-center gap-x-1">
                                        <BsFillCameraReelsFill className="text-slate-800 dark:text-white" />
                                        <span className="text-xs text-slate-900 dark:text-white">{item.title}</span>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))}
            </div>

            {/* پلیر ویدیو */}
            <div className="w-full">
                <div className="relative w-full">
                    <div className="mt-0 nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden w-full aspect-w-16 aspect-h-9">
                        <div className="flex flex-col gap-y-10 text-right dark:text-white">
                            <VideoPlayer
                                poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${currentVideo.poster}`}
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${currentVideo.src}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
