import React from "react";
import {findBrandByUrl} from "@/services/api/shop/brand";
import Listing from "@/app/(shop)/brand/[...url]/Listing";
import MetaTag from "@/components/MetaTag/MetaTag";
import {Metadata} from "next";
import {findPageByUrl} from "@/services/api/shop/page";
import {stripHTML} from "@/hooks/StripHtml";
import Script from "next/script";

interface CategoryPageProps {
    params: {
        url: [string];
    },
    searchParams: {
        page?: string;
    }
}


export async function generateMetadata({params, searchParams}: CategoryPageProps): Promise<Metadata> {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await findBrandByUrl(decodeURIComponent(params.url.join("/")), "", page)

    return {
        title: response.brand.name,
        description: stripHTML(response.brand.description),
        twitter: {
            title: response.brand.name,
            description: stripHTML(response.brand.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${response.brand.image}`,
        },
        openGraph: {
            title: response.brand.name,
            description: stripHTML(response.brand.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${response.brand.image}`,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/brand/${response.brand.url}`,
            type: "website",
        },
        robots: "index , follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/brand/${response.brand.url}`,
        }
    }
}

const PageCollection = async ({params, searchParams}: CategoryPageProps) => {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await findBrandByUrl(decodeURIComponent(params.url.join("/")), "", page)


    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Brand",
        "name": response.brand.name,
        "description": response.brand.description,
        "logo": response.brand.image,
        "sameAs": response.brand.url,
        "itemListElement": response.products.data.map((product, index) => ({
            "@type": "Product",
            "position": index + 1,
            "name": product.name,
            "image": `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,
            "description": product.description,
            "sku": product.id,
            "offers": {
                "@type": "Offer",
                "url": product.url,
                "priceCurrency": "IRR",
                "price": product.min_price,
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/InStock"
            }
        }))
    };
    return (<>
            <Script type="application/ld+json" id="schema">
                {JSON.stringify(structuredData)}
            </Script>
            <Listing response={response} url={decodeURIComponent(params.url.join("/"))}/>
        </>
    );
};

export default PageCollection;
