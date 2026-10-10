import type {Metadata} from "next";
import {normalizeContentHeadings} from "@/utils/seo";
import JsonLd from "@/components/Seo/JsonLd";
import {buildMetadata, assetUrl, absoluteUrl, metaDescription, isoDate} from "@/utils/seo";
import {findCast} from "@/services/server/shop";
import AdaptiveVideoPlayer from "@/shared/VideoPlayer/AdaptiveVideoPlayer";
import React from "react";
import Player from "@/shared/Player/Player";
import CastLinkSection from "@/components/Cast/CastLinkSection";

interface CastPageProps {
    params: Promise<{
        url: [string];
    }>,
}

export async function generateMetadata(props: CastPageProps): Promise<Metadata> {
    const {url} = await props.params;
    const cast = await findCast(decodeURIComponent(url.join("/")));
    return buildMetadata({title: cast.title, description: cast.description || cast.title,
        path: `/tajhizcast/${cast.url}`, image: assetUrl("cast/image", cast.image)});
}

export default async function page(props: CastPageProps) {
    const params = await props.params;
    let response = await findCast(decodeURIComponent(params.url.join("/")));
    return (
        <div className={"container py-2 lg:pb-28 lg:pt-5 space-y-10"}>
            <JsonLd data={{"@context": "https://schema.org", "@type": "PodcastEpisode",
                name: response.title, description: metaDescription(response.description || response.title),
                url: absoluteUrl(`/tajhizcast/${response.url}`), image: assetUrl("cast/image", response.image),
                datePublished: isoDate(response.created_at),
                ...(response.audio && {associatedMedia: {"@type": "AudioObject", contentUrl: assetUrl("cast/audio", response.audio)}}),
            }} />
            <CastLinkSection />
            <h1 className={"font-bold text-xl md:text-4xl "}>
                {
                    response.title
                }
            </h1>
            <AdaptiveVideoPlayer
                className="max-h-[80vh]"
                hls={response?.vlog?.hls ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/hls/${response?.vlog?.hls}` : null}
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response?.vlog?.video}`}
                poster={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${response?.vlog?.poster}`}
            />

            <div className={"flex w-full flex-col gap-2"}>
                <h2 className={"font-bold text-slate-800"}>فایل صوتی را گوش دهید</h2>
                <div dir={"ltr"}>
                    <Player    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/cast/audio/${response?.audio}`}   />

                </div>
            </div>

            <div dangerouslySetInnerHTML={{__html: normalizeContentHeadings((response.description))}}/>

        </div>
    )
}
export const revalidate = 300;
