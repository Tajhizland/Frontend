import {buildMetadata, assetUrl, absoluteUrl, metaDescription, isoDate} from "@/utils/seo";
import {normalizeContentHeadings} from "@/utils/seo";
import React from "react";
import {Metadata} from "next";
import {stripHTML} from "@/hooks/StripHtml";
import {findByUrl} from "@/services/server/shop";
import NcImage from "@/shared/NcImage/NcImage";

interface PageProps {
    params: Promise<{
        url: [string];
    }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const {url} = await props.params;
    const response = await findByUrl(decodeURIComponent(url.join("/")));
    return buildMetadata({title: response.name, description: response.description || response.name,
        path: `/guaranty/${response.url}`, image: assetUrl("guaranty", response.icon)});
}

const PageCollection = async (props: PageProps) => {
    const params = await props.params;
    const response = await findByUrl(decodeURIComponent(params.url.join("/")))
    return (<>
            <div className={"container mt-12"}>
                <div className={"flex justify-center items-center gap-x-5"}>
                    <div>
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-8 h-8"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/guaranty/${response?.icon}`}
                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt={response.name}
                        />
                    </div>
                <h1 className={"text-center font-bold text-xl"}>
                    {response.name}
                </h1>
                </div>
                <hr/>
                <div className={"text-neutral-800 my-5"}>
                    <div dangerouslySetInnerHTML={{__html: normalizeContentHeadings((response.description))}}/>
                </div>
            </div>
        </>
    );
};

export default PageCollection;

export const revalidate = 300;
