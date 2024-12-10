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
import VideoSwiper from "@/components/VideoSwiper";
import SectionSliderNews from "@/components/SectionSliderNews";

export const dynamic = 'force-dynamic';
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
        <div className="nc-PageHome relative overflow-hidden lg:mt-10  dark:bg-neutral-900">
            <SectionHero2 data={response.sliders.data}/>
            <div className="py-5 dark:bg-neutral-900">
                <DiscoverMoreSlider data={response.banners.data}/>
            </div>

            <div className="container relative space-y-5 py-5 lg:space-y-10 lg:py-10  dark:bg-neutral-900">
                <SectionSliderProductCard
                    data={response.popularProducts.data}
                    subHeading={""}
                    heading={"محصولات پر تخفیف"}
                />
                <div className="relative py-5 lg:py-10">
                    <BackgroundSection/>
                    <SectionGridMoreExplore data={response.concepts.data}/>
                </div>
                <div className="py-5 lg:py-10 border-t border-b border-slate-200 dark:border-slate-700">
                    <SectionHowItWork/>
                </div>
                <SectionPromo1/>

                <SectionGridFeatureItems data={response.homepageCategories.data}/>
                <SectionPromo2/>
                <SectionSliderLargeProduct cardStyle="style2" data={response.specialProducts.data}/>

                <div className="relative py-5 lg:py-10">
                    <BackgroundSection/>
                    <div>
                        <Heading>
                            جدیدترین ولاگ
                        </Heading>
                        {/*<SectionMagazine5 data={response.news.data}/>*/}
                        <SectionMagazine5 data={response.vlogs.data}/>
                        <div className="flex mt-16 justify-center">
                            <ButtonSecondary href={"/vlog"}>مشاهده همه</ButtonSecondary>
                        </div>
                    </div>
                </div>
                <SectionSliderCategories data={response.brands.data}/>
                <SectionSliderNews  data={response.news.data}/>
 
            </div>
        </div>
    );
}

export default PageHome;
