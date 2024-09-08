'use client';

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcImage from "@/shared/NcImage/NcImage";
import I403Png from "@/images/500.png";

export default function Error() {


    return (
        <>
            <div className="nc-Page404">
                <div className="container relative pt-5 pb-16 lg:pb-20 lg:pt-5">
                    {/* HEADER */}
                    <header className="text-center max-w-2xl mx-auto space-y-2">
                        <NcImage src={I403Png} alt="not-found" className={"object-cover w-96 h-96 mx-auto"}/>
                        <span
                            className="block text-3xl text-neutral-800    tracking-wider font-bold ">
          500
        </span>
                        <span
                            className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
                            خطای سمت سرور رخ داد !
         </span>
                        <div className="pt-8">
                            <ButtonPrimary href="/">بازگشت به صفحه اصلی</ButtonPrimary>
                        </div>
                    </header>
                </div>
            </div>
        </>
    );
}
