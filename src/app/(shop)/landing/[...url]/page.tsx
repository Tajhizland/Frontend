import React from "react";
import { findLandingByUrl } from "@/services/api/shop/landing";
import SectionHeroLanding from "@/components/SectionHero/SectionHeroLanding";
import LandingBannerSlider from "@/components/LandingBannerSlider";
import LandingCategorySlider from "@/components/LandingCategorySlider";
import LandingProductSlider from "@/components/LandingProductSlider";
import {Metadata} from "next";
//@ts-ignore
import logo from "@/images/tajhizland/logo.png";
import {stripHTML} from "@/hooks/StripHtml";

interface ProductPageProps {
    params: Promise<{
        url: [string];
    }>
}


export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
    const params = await props.params;
    const response = await findLandingByUrl(decodeURIComponent(params.url.join("/")))

    return {
        title: response.title,
        description: stripHTML(response.description),
        twitter: {
            title: response.title,
            description: stripHTML(response.description),
            images: logo.src,
        },
        openGraph: {
            title: response.title,
            description: stripHTML(response.description),
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/landing/${response.url}`,
            type: "website",
        },
        robots: "index , follow",
    }
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
                        <div dangerouslySetInnerHTML={{ __html: (response.description) }} />
                    </span>
                </div>
            </div>
        </header>
    }
    return (<>
        <div className={`nc-ProductDetailPage mt-9 sm:mt-16 dark:bg-slate-900 dark:text-white`}>
            <main className="container mt-5 overflow-hidden whitespace-nowrap">

                <div className={" mx-auto whitespace-nowrap overflow-hidden rounded-2xl"}>
                    {response?.landingBannerSlider?.data &&
                        <SectionHeroLanding data={response.landingBannerSlider.data} />
                    }
                </div>
                {response?.category?.data && <div className="py-5 dark:bg-neutral-900 overflow-hidden my-5">
                    <LandingCategorySlider data={response.category.data} />
                </div>}

                {response?.landingBannerImage?.data &&
                    <div className="py-5 dark:bg-neutral-900 overflow-hidden my-5">
                        <LandingBannerSlider data={response.landingBannerImage.data} />
                    </div>}

                {response?.product?.data && <div className="py-5 dark:bg-neutral-900 overflow-hidden my-5">
                    <LandingProductSlider data={response.product.data} />
                </div>}
            </main>
            <hr className="border-slate-200 dark:border-slate-700" />

            <footer>
                {renderHeader()}
            </footer>
        </div>
    </>
    )
}
