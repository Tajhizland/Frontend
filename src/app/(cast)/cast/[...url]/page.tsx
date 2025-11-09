import {findCast, paginatedCast} from "@/services/api/shop/cast";
import HlsVideoPlayer from "@/shared/VideoPlayer/HlsVideoPlayer";
import VideoPlayer from "@/shared/VideoPlayer/VideoPlayer";
import React from "react";

interface CastPageProps {
    params: Promise<{
        url: [string];
    }>,
}

export default async function page(props: CastPageProps) {
    const params = await props.params;
    let response = await findCast(decodeURIComponent(params.url.join("/")));
    return (
        <div className={"container py-2 lg:pb-28 lg:pt-5 space-y-10"}>
            <h1 className={"font-bold text-xl md:text-4xl "}>
                {
                    response.title
                }
            </h1>
            {
                response?.vlog?.hls && response?.vlog?.hls != "" ?
                    <HlsVideoPlayer src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/hls/${response?.vlog?.hls}`}
                                    poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response?.vlog?.poster}`}/>
                    :
                    <VideoPlayer src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response?.vlog?.video}`}
                                 poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response?.vlog?.poster}`}/>
            }
            <div dangerouslySetInnerHTML={{__html: (response.description)}}/>
            <div className={"flex w-full flex-col gap-2"}>
                <h2 className={"font-bold text-slate-800"}>فایل صوتی را گوش دهید</h2>
                <audio className={"w-full"}
                       src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/audio/${response?.audio}`} controls/>
            </div>
        </div>
    )
}