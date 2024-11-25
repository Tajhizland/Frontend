
import React from "react";
import {findLandingByUrl} from "@/services/api/shop/landing";
import {homePage} from "@/services/api/shop/homePage";
import SectionHero2 from "@/components/SectionHero/SectionHero2";

interface ProductPageProps {
    params: {
        url: [string];
    }
}

export default async function page({params}: ProductPageProps) {
      let response = await findLandingByUrl(decodeURIComponent(params.url.join("/")))
    const response2 = await homePage();


    const renderHeader=()=> {
        return <header className="container rounded-xl">
            <div className="max-w-screen-md mx-auto space-y-5">
                <h1
                    className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "

                >
                    {response.title}
                </h1>
                <span
                    className=" text-neutral-900 font-semibold   md:!leading-[120%]   dark:text-neutral-100 max-w-4xl "
                >
                          {
                              response.description
                          }
                        </span>
            </div>
        </header>
    }
    return (<>
            <div className={`nc-ProductDetailPage mt-9 sm:mt-16`}>
                <div className={"max-w-5xl mx-auto whitespace-nowrap overflow-hidden rounded-2xl"}>
                    <SectionHero2 data={response2.sliders.data}/>
                </div>
                <main className="container mt-5 ">
                    <h2>خرید بر اساس دسته بندی</h2>
                </main>
                <hr className="border-slate-200 dark:border-slate-700"/>

                <footer>
                    {renderHeader()}
                </footer>
            </div>
        </>
    )
}
