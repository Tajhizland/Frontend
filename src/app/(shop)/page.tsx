import React from "react";
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection";
import SectionPromo1 from "@/components/SectionPromo1";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/(shop)/blog/SectionMagazine5";
import {homePage} from "@/services/api/shop/homePage";
import logo from "@/images/tajhizland/logo.png";
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "تجهیزلند",
        description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
        twitter: {
            title: "تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
        },
        openGraph: {
            title: "تجهیزلند",
            description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
            images: logo.src,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}`,
            type: "website",
        },
        robots: "index , follow",
    }
}

async function PageHome() {
    const response = await homePage();
    return (
        <div className="nc-PageHome relative overflow-hidden">
            <SectionHero2 data={response.sliders.data}/>
            <div className="mt-24 lg:mt-32">
                <DiscoverMoreSlider data={response.popularCategories.data}/>
            </div>

            <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
                <SectionSliderProductCard
                    data={response.popularProducts.data}
                    subHeading={""}
                    heading={"تخفیفی های تجهیزلند"}
                />
                <div className="relative py-24 lg:py-32">
                    <BackgroundSection/>
                    <SectionGridMoreExplore data={response.concepts.data}/>
                </div>
                <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
                    <SectionHowItWork/>
                </div>
                <SectionPromo1/>

                <SectionGridFeatureItems data={response.homepageCategories.data}/>
                <SectionPromo2/>
                <SectionSliderLargeProduct cardStyle="style2" data={response.specialProducts.data}/>

                <div className="relative py-24 lg:py-32">
                    <BackgroundSection/>
                    <div>
                        <Heading>
                            جدیدترین اخبار
                        </Heading>
                        <SectionMagazine5 data={response.news.data}/>
                        <div className="flex mt-16 justify-center">
                            <ButtonSecondary href={"/news"}>مشاهده همه</ButtonSecondary>
                        </div>
                    </div>
                </div>

                <SectionSliderCategories data={response.brands.data}/>

                {/*<SectionSliderProductCard*/}
                {/*    heading="Best Sellers"*/}
                {/*    subHeading="Best selling of the month"*/}
                {/*/>*/}


                {/*<SectionPromo3/>*/}


                {/*<SectionClientSay/>*/}
            </div>
        </div>
    );
}

export default PageHome;
