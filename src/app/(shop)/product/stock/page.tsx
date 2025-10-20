import React from "react";
import {getStockProductsPaginate} from "@/services/api/shop/product";
import StockListing from "@/components/Linsting/StockListing";
import {Metadata} from "next";
//@ts-ignore
import logo from "@/images/lightLogo.png";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "محصولات کار کرده تجهیزلند",
        description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
        twitter: {
            title: "محصولات کار کرده تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
        },
        openGraph: {
            title: "محصولات کار کرده تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
            type: "website",
        },
        robots: "index , follow",
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/product/discounted`,
        }
    }
}

const Page = async () => {
    const response = await getStockProductsPaginate();
    return (
        <>
            <StockListing response={response}/>
        </>
    );
};

export default Page;
