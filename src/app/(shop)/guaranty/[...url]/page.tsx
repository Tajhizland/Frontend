import React from "react";
import {Metadata} from "next";
import {stripHTML} from "@/hooks/StripHtml";
import {findByUrl} from "@/services/api/shop/guaranty";

interface PageProps {
    params: {
        url: [string];
    }
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
    let response = await findByUrl(decodeURIComponent(params.url.join("/")))

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

const PageCollection = async ({params}: PageProps) => {
    let response = await findByUrl(decodeURIComponent(params.url.join("/")))
    return (<>
            <div dangerouslySetInnerHTML={{__html: (response.description)}}/>
        </>
    );
};

export default PageCollection;
