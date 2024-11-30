import {findVlogByUrl} from "@/services/api/shop/vlog";
import React from "react";

interface PageProps {
    params: {
        url: [string];
    },
}

export default async function Page({params}: PageProps) {
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
                            {response.title}
                        </h1>
                        <span
                            style={{direction: "ltr"}}
                            className=" text-neutral-500 font-semibold text-sm dark:text-neutral-100 "
                        >
            {response.created_at}
          </span>
                    </div>
                </header>
            </>
        );
    };

    const renderContent = () => {
        return (
            <div className={"flex flex-col gap-y-10 text-right dark:text-white"}>
                <video
                    className="w-full h-auto"
                    controls
                >
                    <source src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response.video}`} type="video/mp4"/>
                </video>

                <div dangerouslySetInnerHTML={{__html: (response.description)}}/>
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
        </div>
    </>)
}
