import {buildMetadata, assetUrl, absoluteUrl, metaDescription, isoDate} from "@/utils/seo";
import {normalizeContentHeadings} from "@/utils/seo";
import React from "react";
import {findLandingByUrl} from "@/services/server/shop";

import {Metadata} from "next";
//@ts-ignore
import logo from "@/images/lightLogo.png";
import {stripHTML} from "@/hooks/StripHtml";
import SectionHeroLanding from "@/components/Landing/SectionHeroLanding";
import LandingCategorySlider from "@/components/Landing/LandingCategorySlider";
import LandingBannerSlider from "@/components/Landing/LandingBannerSlider";
import LandingProductSlider from "@/components/Landing/LandingProductSlider";

interface ProductPageProps {
    params: Promise<{
        url: [string];
    }>
}

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
    const {url} = await props.params;
    const response = await findLandingByUrl(decodeURIComponent(url.join("/")));
    return buildMetadata({title: response.title, description: response.description || response.title,
        path: `/landing/${response.url}`, image: undefined});
}

export default async function page(props: ProductPageProps) {
    const params = await props.params;
    const response = await findLandingByUrl(decodeURIComponent(params.url.join("/")))


    const renderHeader = () => {
        return <header className=" container rounded-xl py-10">
            <div className=" mx-auto space-y-5">
                <div>
                    <h1
                        className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
                    >
                        {response.title}
                    </h1>
                </div>
                <div>
                    <span
                        className=" text-neutral-900 font-semibold   md:!leading-[120%] mt-10   dark:text-neutral-100 max-w-4xl "
                    >
                        <div dangerouslySetInnerHTML={{__html: normalizeContentHeadings((response.description))}}/>
                    </span>
                </div>
            </div>
        </header>
    }
    return (<>
            <div className={`nc-ProductDetailPage mt-9 sm:mt-16 dark:bg-slate-900 dark:text-white`}>
                <main className="container mt-5 overflow-hidden whitespace-nowrap">

                    <div className={" mx-auto whitespace-nowrap overflow-hidden rounded-2xl"}>
                        {response?.landingBannerSlider &&
                            <SectionHeroLanding data={response.landingBannerSlider}/>
                        }
                    </div>
                    {response?.category && <div className="py-5 dark:bg-neutral-900 overflow-hidden my-5">
                        <LandingCategorySlider data={response.category}/>
                    </div>}

                    {response?.landingBannerImage &&
                        <div className="py-5 dark:bg-neutral-900 overflow-hidden my-5">
                            <LandingBannerSlider data={response.landingBannerImage}/>
                        </div>}

                    {response?.product && <div className="py-5 dark:bg-neutral-900 overflow-hidden my-5">
                        <LandingProductSlider data={response.product}/>
                    </div>}
                </main>
                <hr className="border-slate-200 dark:border-slate-700"/>

                <footer>
                    {renderHeader()}
                </footer>
            </div>
        </>
    )
}

export const revalidate = 300;
