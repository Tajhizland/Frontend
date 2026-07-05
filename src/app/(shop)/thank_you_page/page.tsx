//@ts-ignore
import orderLogo from "@/images/orderlimit.png";
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

const ThankYouPage = ({searchParams}: { searchParams: { order_id?: string } }) => {
    const orderId = searchParams?.order_id?.trim();

    return (
        <>
            <div className="nc-Page404">
                <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
                    {/* HEADER */}
                    <header className="text-center max-w-2xl mx-auto space-y-2">
                        <Image src={orderLogo} alt="403" className={"object-cover  mx-auto"}/>
                        <strong
                            className="block text-neutral-800  dark:text-neutral-200 tracking-wider font-extrabold">
                            تبریک
                        </strong>
                        <span
                            className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
                        سفارش شما با موفقیت ثبت گردید
                        </span>
                        {orderId && (
                            <div className="pt-4 flex justify-center">
                                <div
                                    className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-5 py-2.5 dark:border-primary-500/40 dark:bg-primary-500/10">
                                    <span
                                        className="text-sm text-neutral-600 dark:text-neutral-300 tracking-wider font-medium">
                                        شماره پیگیری :
                                    </span>
                                    <span
                                        className="text-base text-primary-600 dark:text-primary-400 tracking-wider font-bold">
                                        {orderId}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="pt-8">
                            <ButtonPrimary href="/">بازگشت به صفحه اصلی</ButtonPrimary>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
};

export default ThankYouPage;
