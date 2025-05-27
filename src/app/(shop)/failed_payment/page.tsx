//@ts-ignore
import orderLogo from "@/images/failed.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Image from "next/image";
import {Metadata} from "next";
//@ts-ignore
import logo from "@/images/lightLogo.png";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "تکمیل خرید",
        description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
        twitter: {
            title: "محصولات ویژه تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
        },
        openGraph: {
            title: "تکمیل خرید",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
            type: "website",
        },
        robots: "noindex",
    }
}

const FailedOrderPage = () => {

    return (
        <>
            <div className="nc-Page404">
                <div className="container relative  py-16 lg:py-20 ">
                    {/* HEADER */}
                    <header className="text-center max-w-2xl mx-auto space-y-2">
                        <Image src={orderLogo} alt="403" className={"object-cover  mx-auto"}/>

                        <span
                            className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
                        متاسفانه پرداخت شما نا موفق بود
                        </span>
                        <div className="pt-8">
                            <ButtonPrimary href="/">بازگشت به صفحه اصلی</ButtonPrimary>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
};

export default FailedOrderPage;
