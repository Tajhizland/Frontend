"use client";
import React, {useState, Fragment} from "react";
import VideoPlayer from "@/shared/VideoPlayer/VideoPlayer";
import NcImage from "@/shared/NcImage/NcImage";
import HlsVideoPlayer from "@/shared/VideoPlayer/HlsVideoPlayer";
import {ProductVideoResponse} from "@/services/types/productVideo";
import {RiMovie2Fill} from "react-icons/ri";

export default function SectionProductVideo({videos}: { videos: ProductVideoResponse[] }) {

    const [activeVideo, setActiveVideo] = useState(0);
    if (videos.length == 0) return <></>;

    return (
        <div className="flex flex-col-reverse xl:flex-row gap-2">

            {/* لیست ویدیوها */}
            <div className="flex flex-col md:flex-row lg:flex-col gap-9 overflow-y-auto overflow-x-hidden max-h-72 flex-1 whitespace-nowrap w-full">
                {videos.length > 1 &&
                    videos.map((item, index) => (
                        <Fragment key={index}>
                            <div
                                onClick={() => setActiveVideo(index)}
                                className="bg-neutral-100 hover:bg-neutral-200 dark:bg-black/20 dark:hover:bg-black/30 rounded flex shrink-0   gap-x-2 w-full  cursor-pointer overflow-hidden items-center"
                            >
                                <div className="flex-shrink-0 w-32">
                                    <NcImage
                                        containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item?.vlog?.poster}`}
                                        className="object-cover w-full h-full drop-shadow-xl"
                                        fill
                                        alt="vlog"
                                    />
                                </div>

                                <div className="flex flex-col justify-between w-full whitespace-nowrap py-2">
                                    <div className="flex items-center gap-x-1">
                                        <RiMovie2Fill className="text-slate-600 dark:text-white w-4 h-4 flex-shrink-0"/>
                                        <span className="text-xs text-slate-900 dark:text-white whitespace-pre-wrap">{item.title}</span>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    ))}
            </div>

            {/* پلیر ویدیو */}
            <div className="w-full flex-[2]">
                <div className="relative w-full">

                    <div
                        className="mt-0 nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden w-full aspect-w-16 aspect-h-9">
                        <div className="flex flex-col gap-y-10 text-right dark:text-white">
                            {
                                videos[activeVideo]?.vlog?.hls && videos[activeVideo]?.vlog?.hls != "" ?
                                    <HlsVideoPlayer
                                        poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${videos[activeVideo]?.vlog?.poster}`}
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/hls/${videos[activeVideo]?.vlog?.hls}`}
                                    />
                                    :
                                    <VideoPlayer
                                        poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${videos[activeVideo]?.vlog?.poster}`}
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${videos[activeVideo]?.vlog?.video}`}
                                    />
                            }

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
