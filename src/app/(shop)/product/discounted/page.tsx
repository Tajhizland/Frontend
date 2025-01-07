//@ts-nocheck

import React  from "react";
import {getDiscountedProducts} from "@/services/api/shop/product";
import Listing from "@/app/(shop)/product/discounted/Listing";
const Page = async ( ) => {
    let response = await getDiscountedProducts();

    return (
        <>
            <Listing response={response} />
        </>
    );
};

export default Page;
