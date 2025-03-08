import React  from "react";
import {getDiscountedProducts} from "@/services/api/shop/product";
import DiscountListing from "@/components/Linsting/DiscountListing";
import {Metadata} from "next";
//@ts-ignore
import logo from "@/images/lightLogo.png";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "محصولات تخفیف دار تجهیزلند",
        description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
        twitter: {
            title: "محصولات تخفیف دار تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
        },
        openGraph: {
            title: "محصولات تخفیف دار تجهیزلند",
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

const Page = async ( ) => {
    const response = await getDiscountedProducts();
    return (
        <>
            <DiscountListing response={response} />
        </>
    );
};

export default Page;
