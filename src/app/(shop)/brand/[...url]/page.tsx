import React from "react";
import {findBrandByUrl} from "@/services/api/shop/brand";
import Listing from "@/app/(shop)/brand/[...url]/Listing";

interface CategoryPageProps {
    params: {
        url: [string];
    },
    searchParams: {
        page?: string;
    }
}

const PageCollection = async ({params , searchParams}: CategoryPageProps) => {
    const page = searchParams.page ? parseInt(searchParams.page, 10) : 1;
    let response = await findBrandByUrl(decodeURIComponent(params.url.join("/")) ,"",page)
    return (
        <Listing response={response} url={decodeURIComponent(params.url.join("/"))} />
    );
};

export default PageCollection;
