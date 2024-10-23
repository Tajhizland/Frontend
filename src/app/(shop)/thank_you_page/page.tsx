import orderLogo from "@/images/orderlimit.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Image from "next/image";

const ThankYouPage = () => {

    return (
        <>
            <head>
                <title>پرداخت موفق</title>
            </head>
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
