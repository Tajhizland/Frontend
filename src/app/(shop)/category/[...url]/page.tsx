import React from "react";
import {findCategoryByUrl} from "@/services/api/shop/category";
import Listing from "@/app/(shop)/category/[...url]/Listing";
import MetaTag from "@/components/MetaTag/MetaTag";

interface CategoryPageProps {
    params: {
        url: [string];
    },
    searchParams: {
        page?: string;
    }
}

const PageCollection = async ({params, searchParams}: CategoryPageProps) => {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await findCategoryByUrl(decodeURIComponent(params.url.join("/")), "", page)
    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "ItemList",
        "name": response.category.name,
        "description":response.category.description,
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
            <MetaTag description={response.category.description} title={response.category.name} canonical={"https://tajhizland/category/"+response.category.url} structuredData={JSON.stringify(structuredData)}/>
            <Listing response={response} url={decodeURIComponent(params.url.join("/"))}/>
        </>
    );
};

export default PageCollection;
