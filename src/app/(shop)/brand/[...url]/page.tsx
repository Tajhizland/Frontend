import React from "react";
import { findBrandByUrl } from "@/services/api/shop/brand";
import Listing from "@/app/(shop)/brand/[...url]/Listing";
import MetaTag from "@/components/MetaTag/MetaTag";

interface CategoryPageProps {
    params: {
        url: [string];
    },
    searchParams: {
        page?: string;
    }
}

const PageCollection = async ({ params, searchParams }: CategoryPageProps) => {
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

    console.log("SD",structuredData);
    
    return (<>
        <MetaTag description={response.brand.description}
            title={response.brand.name}
            canonical={"https://tajhizland/brand/" + response.brand.url}
            structuredData={JSON.stringify(structuredData)} />
        <Listing response={response} url={decodeURIComponent(params.url.join("/"))} />
    </>
    );
};

export default PageCollection;
