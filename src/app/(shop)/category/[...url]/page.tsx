import React from "react";
import {findCategoryByUrl} from "@/services/api/shop/category";
import Listing from "@/app/(shop)/category/[...url]/Listing";
import MetaTag from "@/components/MetaTag/MetaTag";
import {Metadata} from "next";
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
    let response = await findCategoryByUrl(decodeURIComponent(params.url.join("/")), "", page)
    return {
        title: response.category.name,
        description: stripHTML(response.category.description),
        twitter: {
            title: response.category.name,
            description: stripHTML(response.category.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${response.category.image}`,
        },
        openGraph: {
            title: response.category.name,
            description: stripHTML(response.category.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${response.category.image}`,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/category/${response.category.url}`,
            type: "website",
        },
        robots: "index , follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/category/${response.category.url}`,
        }
    }
}

const PageCollection = async ({params, searchParams}: CategoryPageProps) => {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await findCategoryByUrl(decodeURIComponent(params.url.join("/")), "", page)
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "ItemList",
        "name": response.category.name,
        "description": response.category.description,
        "itemListElement": response.products.data.map((product, index) => ({
            "@type": "Product",
            "position": index + 1,
            "name": product.name,
            "image": `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product.images.data[0].url}`,
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
