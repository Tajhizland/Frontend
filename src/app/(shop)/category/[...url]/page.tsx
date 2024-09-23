import React from "react";
import {findCategoryByUrl} from "@/services/api/shop/category";
import Listing from "@/app/(shop)/category/[...url]/Listing";

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
    let response = await findCategoryByUrl(decodeURIComponent(params.url.join("/")) ,"",page)
    return (
        <Listing response={response} url={decodeURIComponent(params.url.join("/"))} />
    );
};

export default PageCollection;
