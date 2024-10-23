import orderLogo from "@/images/order2.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import Image from "next/image";

const ThankYouPageLimit = () => {

    return (
        <>
            <div className="nc-Page404">
                <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
                    {/* HEADER */}
                    <header className="text-center max-w-2xl mx-auto space-y-2">
                        <Image src={orderLogo} alt="403" className={"object-cover  mx-auto"}/>

                        <span  className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 font-medium">
                            در خواست سفارش شما ثبت گردید .
                        </span>
                        <span  className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200  font-medium">
                            پس از بررسی و تایید مدیریت امکان پرداخت و ثبت نهایی آن از پنل کاربری وجود دارد .
                        </span>
                        <div className="pt-8 gap-x-5 flex justify-center">
                            <ButtonPrimary href="/">بازگشت به صفحه اصلی</ButtonPrimary>
                            <ButtonPrimary href="/account-order-on-hold">سفارشات معلق من</ButtonPrimary>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
};

export default ThankYouPageLimit;
