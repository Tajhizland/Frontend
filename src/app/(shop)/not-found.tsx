import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React from "react";
import I404Png from "@/images/404.png";
import NcImage from "@/shared/NcImage/NcImage";

const Page404 = () => (
    <div className="nc-Page404">
        <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
            {/* HEADER */}
            <header className="text-center max-w-2xl mx-auto space-y-2">
                <NcImage src={I404Png} alt="not-found" />
                <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          {`متاسفانه صفحه مورد نظر یافت نشد. `}{" "}
        </span>
                <div className="pt-8">
                    <ButtonPrimary href="/">بازگشت به صفحه اصلی</ButtonPrimary>
                </div>
            </header>
        </div>
    </div>
);

export default Page404;
