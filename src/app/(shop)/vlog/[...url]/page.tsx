import {findVlogByUrl} from "@/services/api/shop/vlog";
import React from "react";
import {VlogResponse} from "@/services/types/vlog";
import Link from "next/link";
import {Route} from "next";
import NcImage from "@/shared/NcImage/NcImage";
import {FaEye} from "react-icons/fa";
import Heading from "@/components/Heading/Heading";
import VideoPlayer2 from "@/shared/VideoPlayer/VideoPlayer2";
import HlsVideoPlayer from "@/shared/VideoPlayer/HlsVideoPlayer";
import VideoPlayer from "@/shared/VideoPlayer/VideoPlayer";

interface PageProps {
    params: Promise<{
        url: [string];
    }>,
}

export default async function Page(props: PageProps) {
    const params = await props.params;
    let response = await findVlogByUrl(decodeURIComponent(params.url.join("/")));

    const renderHeader = () => {
        return (
            <>
                <header className="container rounded-xl mb-5">
                    <div className=" mx-auto space-y-5 flex justify-between">
                        <h1
                            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
                            title="Quiet ingenuity: 120,000 lunches and counting"
                        >
                            {response.vlog.title}
                        </h1>
                        <span
                            style={{direction: "ltr"}}
                            className=" text-neutral-500 font-semibold text-sm dark:text-neutral-100 "
                        >
            {response.vlog.created_at}
          </span>
                    </div>
                </header>
            </>
        );
    };

    const renderContent = () => {
        return (
            <div className={"flex flex-col gap-y-10 text-right dark:text-white"}>
                {
                    response.vlog.hls &&  response.vlog.hls!="" ?
                        <HlsVideoPlayer src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/hls/${response.vlog.hls}`}  poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response.vlog.poster}`}  />
                        :
                        <VideoPlayer src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response.vlog.video}`}  poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response.vlog.poster}`} />
                }
                <div dangerouslySetInnerHTML={{__html: (response.vlog.description)}}/>
            </div>
        );
    };
    const renderVlogCard = (item:VlogResponse) => {
        return (
            <div className="w-full h-full rounded-xl overflow-hidden border bg-white dark:bg-transparent" key={item.id}>
                <Link
                    href={"/vlog/" + item.url as Route}
                    aria-label={"vlog"}
                    className="flex flex-col"
                >
                    <NcImage
                        containerClassName="flex aspect-w-16 aspect-h-9 w-full h-0"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.poster}`}
                        className="object-cover w-full h-full drop-shadow-xl"
                        fill
                        alt="vlog"
                    />
                    <span className="py-2.5 px-2 dark:text-white">{item.title}</span>
                    <div className="flex justify-between items-center py-1 px-2 text-neutral-500 dark:text-white">
                        <div className="flex items-center gap-x-2">
                            <FaEye/>
                            <span>{item.view}</span>
                        </div>
                        <span className="text-xs">{item.created_at}</span>
                    </div>
                </Link>
            </div>
        );
    };
    const renderRelatedVlogs = () => {
        return (
            <div className={"flex flex-col my-5 text-right dark:text-white container"}>
                <Heading
                >
                    ولاگ های مرتبط
                </Heading>
                <div  className="grid grid-cols-2 lg:grid-cols-4 gap-10">
                    {
                        response.relatedVlogs.data.map((item) => (<>
                            {renderVlogCard(item)}
                        </>))
                    }
                </div>
            </div>
        );
    };
    return (<>
        <div className="nc-PageSingle pt-8 lg:pt-16 dark:bg-neutral-900">

            {renderHeader()}
            <hr/>
            <div className="nc-SingleContent container space-y-10 text-center news mt-5">
                {renderContent()}
                <div
                    className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
            </div>
            <hr/>

            {renderRelatedVlogs()}
        </div>
    </>)
}
