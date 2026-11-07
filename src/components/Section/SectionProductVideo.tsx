"use client";
import React, {useState} from "react";
import NcImage from "@/shared/NcImage/NcImage";
import AdaptiveVideoPlayer from "@/shared/VideoPlayer/AdaptiveVideoPlayer";
import {ProductVideoResponse} from "@/services/types/productVideo";
import {RiMovie2Fill} from "react-icons/ri";

export default function SectionProductVideo({videos}: { videos: ProductVideoResponse[] }) {

    const [activeVideo, setActiveVideo] = useState(0);
    if (videos.length == 0) return <></>;

    return (
        <div className="@container min-w-0">
            <div className={`flex min-w-0 flex-col-reverse gap-4 ${videos.length > 1 ? "@3xl:grid @3xl:grid-cols-[220px_minmax(0,1fr)] @3xl:items-start" : ""}`}>

                {/* لیست ویدیوها */}
                {videos.length > 1 && <div className="flex max-h-72 min-w-0 flex-col gap-3 overflow-y-auto overscroll-contain">
                    {videos.map((item, index) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    aria-pressed={activeVideo === index}
                                    onClick={() => setActiveVideo(index)}
                                    className={`flex w-full min-w-0 shrink-0 items-center gap-3 overflow-hidden rounded-lg border p-2 text-right transition-colors hover:bg-neutral-100 focus-visible:outline-2 dark:hover:bg-black/30 ${activeVideo === index ? "border-primary-500 bg-neutral-100 dark:bg-black/20" : "border-transparent bg-neutral-50 dark:bg-black/10"}`}
                                >
                                    <div className="w-24 shrink-0">
                                        <NcImage
                                            containerClassName="relative aspect-video w-full overflow-hidden rounded-md"
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item?.vlog?.poster}`}
                                            className="object-cover w-full h-full drop-shadow-xl"
                                            fill
                                            sizes="96px"
                                            alt={item.title || item.vlog?.title || "ویدیوی محصول"}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1 py-1">
                                        <div className="flex min-w-0 items-start gap-1.5">
                                            <RiMovie2Fill className="text-slate-600 dark:text-white w-4 h-4 shrink-0"/>
                                            <span className="min-w-0 line-clamp-2 break-words text-xs leading-5 text-slate-900 dark:text-white">{item.title || item.vlog?.title || "ویدیوی محصول"}</span>
                                        </div>
                                    </div>
                                </button>
                        ))}
                </div>}

                {/* پلیر ویدیو؛ قاب ثابت ۱۶:۹ حذف شد تا ویدیوی عمودی له نشود */}
                <div className="w-full min-w-0">
                    <AdaptiveVideoPlayer
                        className="max-h-[70vh]"
                        hls={videos[activeVideo]?.vlog?.hls
                            ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/hls/${videos[activeVideo]?.vlog?.hls}`
                            : null}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${videos[activeVideo]?.vlog?.video}`}
                        poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${videos[activeVideo]?.vlog?.poster}`}
                    />
                </div>

            </div>
        </div>
    );
}
