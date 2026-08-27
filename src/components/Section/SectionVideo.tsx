"use client";
import React, { useState, Fragment } from "react";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { VlogResponse } from "@/services/types/vlog";
import NcImage from "@/shared/NcImage/NcImage";
import AdaptiveVideoPlayer from "@/shared/VideoPlayer/AdaptiveVideoPlayer";

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
            hls: intro_video?.hls ?? "",
            poster: intro_video?.poster ?? "",
            title: "معرفی محصول",
            description: intro_video?.title ?? "",
        },
        {
            src: usage_video?.video ?? "",
            hls: usage_video?.hls ?? "",
            poster: usage_video?.poster ?? "",
            title: "آماده به کار محصول",
            description: usage_video?.title ?? "",
        },
        {
            src: unboxing_video?.video ?? "",
            hls: unboxing_video?.hls ?? "",
            poster: unboxing_video?.poster ?? "",
            title: "آنباکس محصول",
            description: unboxing_video?.title ?? "",
        },
    ].filter((v) => v.src !== ""); // فقط ویدیوهای موجود رو نگه دار

    const [currentVideo, setCurrentVideo] = useState(() => {
        return videos[0] || { src: "", poster: "", title: "", hls: "", description: "" };
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
                                        containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0 bg-neutral-200 dark:bg-black/40"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.poster}`}
                                        // contain تا پوستر ویدیوی عمودی بریده نشود
                                        className="object-contain w-full h-full drop-shadow-xl"
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

            {/* پلیر ویدیو؛ قاب ثابت ۱۶:۹ حذف شد تا ویدیوی عمودی له نشود */}
            <div className="w-full">
                <AdaptiveVideoPlayer
                    className="max-h-[70vh]"
                    hls={currentVideo.hls ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/hls/${currentVideo.hls}` : null}
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${currentVideo.src}`}
                    poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${currentVideo.poster}`}
                />
            </div>

        </div>
    );
}
