import React from "react";
import {Metadata} from "next";
import {stripHTML} from "@/hooks/StripHtml";
import {findByUrl} from "@/services/api/shop/guaranty";
import NcImage from "@/shared/NcImage/NcImage";

interface PageProps {
    params: Promise<{
        url: [string];
    }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
    const params = await props.params;
    const response = await findByUrl(decodeURIComponent(params.url.join("/")))

    return {
        title: response.name,
        description: stripHTML(response.description),
        twitter: {
            title: response.name,
            description: stripHTML(response.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/guaranty/${response.icon}`,
        },
        openGraph: {
            title: response.name,
            description: stripHTML(response.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/guaranty/${response.icon}`,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/guaranty/${response.url}`,
            type: "website",
        },
        robots: "index , follow",
    }
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
                            alt="guaranty"
                        />
                    </div>
                <h1 className={"text-center font-bold text-xl"}>
                    {response.name}
                </h1>
                </div>
                <hr/>
                <div className={"text-neutral-800 my-5"}>
                    <div dangerouslySetInnerHTML={{__html: (response.description)}}/>
                </div>
            </div>
        </>
    );
};

export default PageCollection;
