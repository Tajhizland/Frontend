import {Metadata} from "next";
import logo from "@/images/lightLogo.png"
import {homePage} from "@/services/api/shop/homePage";
import MobileHero from "@/components/Hero/MobileHero";
import Hero from "@/components/Hero/Hero";
import SectionDiscountSlider from "@/components/Section/SectionDiscountSlider";
import SectionBannerSlider from "@/components/Section/SectionBannerSlider";
import SectionTwinBanner from "@/components/Section/SectionTwinBanner";
import BackgroundSection from "@/components/Section/BackgroundSection";
import SectionConcept from "@/components/Section/SectionConcept";
import SectionPromoFeatures from "@/components/Section/SectionPromoFeatures";
import SectionPromo1 from "@/components/Section/SectionPromo1";
import SectionPromo2 from "@/components/Section/SectionPromo2";
import SectionHomepageCategory from "@/components/Section/SectionHomepageCategory";
import SectionSpecialSlider from "@/components/Section/SectionSpecialSlider";
import SectionHomepageVlog from "@/components/Section/SectionHomepageVlog";
import SectionHomepageBrand from "@/components/Section/SectionHomepageBrand";
import SectionHomepageBlog from "@/components/Section/SectionHomepageBlog";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";
import Timer from "@/components/Timer/Timer";

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

export default async function Homepage() {
    const response = await homePage();

    return (<div className="relative overflow-hidden lg:mt-10 dark:bg-neutral-900">
        <div className={"hidden sm:block"}>
            <Hero data={response.desktopSliders.data}/>
        </div>
        <div className={"block sm:hidden container  "}>
            <div className={"rounded-2xl overflow-hidden !p-0 "}>
                <MobileHero data={response.mobileSliders.data}/>
            </div>
        </div>
        <div className="dark:bg-neutral-900">
            <SectionBannerSlider data={response.banners.data}/>
        </div>

        {/*<div className="container my-5 sm:my-20 px-0 md:px-[1rem] ">*/}
        {/*    <SectionDiscountSlider*/}
        {/*        data={response.popularProducts.data}*/}
        {/*        subHeading={""}*/}
        {/*    />*/}
        {/*</div>*/}

        <div className="container bg-[#fcb415] sm:bg-white my-5 sm:my-20 px-0 md:px-[1rem] ">

            <SectionDiscountSlider
                timer={response?.discount?.discount_expire_time}
                data={response.popularProducts.data}
                subHeading={""}
            />
        </div>

        <div className="container relative space-y-5 py-5 lg:space-y-10 lg:py-10  dark:bg-neutral-900">
            <SectionTwinBanner banners={response.banners2.data}/>
            <div className="relative py-5 lg:py-10">
                <BackgroundSection/>
                <SectionConcept data={response.concepts.data}/>
            </div>
            <SectionTwinBanner banners={response.banners3.data}/>
            <div className="py-5 lg:py-10 border-t border-b border-slate-200 dark:border-slate-700">
                <SectionPromoFeatures/>
            </div>
            <SectionPromo1 logo={response.posters.data[0].image}/>
            <SectionHomepageCategory data={response.homepageCategories.data}/>
            <SectionPromo2 logo={response.posters.data[1].image}/>
            <SectionSpecialSlider data={response.specialProducts.data}/>
            <SectionTwinBanner banners={response.banners4.data}/>
            <SectionHomepageVlog data={response.vlogs.data}/>
            {response.banners5.data.length > 0 && <SectionSingleBanner banner={response.banners5.data[0]}/>}
            <SectionHomepageBrand data={response.brands.data}/>
        </div>
        <SectionHomepageBlog data={response.news.data}/>
    </div>)
}
