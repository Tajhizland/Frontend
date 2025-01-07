import React from "react";
import { findLandingByUrl } from "@/services/api/shop/landing";
import SectionHeroLanding from "@/components/SectionHero/SectionHeroLanding";
import LandingBannerSlider from "@/components/LandingBannerSlider";
import LandingCategorySlider from "@/components/LandingCategorySlider";
import LandingProductSlider from "@/components/LandingProductSlider";

interface ProductPageProps {
    params: {
        url: [string];
    }
}

export default async function page({ params }: ProductPageProps) {
    let response = await findLandingByUrl(decodeURIComponent(params.url.join("/")))


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
