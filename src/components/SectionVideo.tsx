"use client"
import React, {useState} from "react";
import {FaPlay} from "react-icons/fa";
import {BsFillCameraReelsFill} from "react-icons/bs";

export default function SectionVideo({
                                         intro_video,
                                         unboxing_video,
                                         usage_video,
                                         intro_video_description,
                                         unboxing_video_description,
                                         usage_video_description,
                                     }: {
    intro_video: string;
    unboxing_video: string;
    usage_video: string;
    intro_video_description: string,
    unboxing_video_description: string,
    usage_video_description: string
}) {
    const [openVideo, setOpenVideo] = useState(intro_video);

    const videos = [
        {
            src: intro_video,
            title: "معرفی محصول",
            description: intro_video_description
        },
        {
            src: usage_video,
            title: "آماده به کار محصول",
            description: usage_video_description
        },
        {
            src: unboxing_video,
            title: "آنباکس محصول",
            description: unboxing_video_description
        },
    ]
    return (<>
        <div className={"flex flex-col-reverse xl:flex-row gap-5"}>
            <div className={"flex flex-col md:flex-row lg:flex-col justify-between gap-5"}>
                {
                    videos.map((item, index) => (<div key={index}
                        onClick={() => {
                            setOpenVideo(item.src);
                        }}
                        className={"bg-neutral-100 hover:bg-neutral-200 dark:bg-black/20 dark:hover:bg-black/30 rounded flex gap-x-2 w-full xl:w-64 cursor-pointer overflow-hidden"}>

                        <div className="flex-shrink-0 w-32 h-20">
                            <video className="w-full h-full">
                                <source src={intro_video} type="video/mp4"/>
                            </video>
                        </div>
                        <div className={"flex flex-col justify-between w-fit whitespace-nowrap flex-1 py-2"}>
                            <div className={"flex items-center gap-x-1"}>
                                <BsFillCameraReelsFill className={"text-slate-800 dark:text-white"} />
                                <span className={"text-xs text-slate-900 dark:text-white"}>{item.title}</span>
                            </div>
                            <div>
                                <span className={"text-sm text-slate-900 dark:text-white"}>{item.description}</span>
                            </div>
                        </div>
                    </div>))
                }
            </div>
            <div className={"w-full "}>
                <div className="relative w-full ">
                    <div
                        className={`mt-0   nc-SectionHero2Item nc-SectionHero2Item--animation flex flex-col-reverse lg:flex-col relative overflow-hidden w-full  aspect-w-16 aspect-h-9 `}>
                        <div className="h-full mx-auto flex justify-center items-center">
                            <video className="w-full h-auto object-cover" controls>
                                <source src={openVideo} type="video/mp4"/>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
