import React from "react";
import {homePage} from "@/services/api/shop/homePage";
import MobileHero from "@/components/Hero/MobileHero";
import Hero from "@/components/Hero/Hero";
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
import SectionHomepageBlog from "@/components/Section/SectionHomepageBlog";
import SectionSingleBanner from "@/components/Section/SectionSingleBanner";
import SectionNewDiscountSlider from "@/components/Section/SectionNewDiscountSlider";
import SectionRandomProducts from "@/components/Section/SectionRandomProducts";
import SectionBrand from "@/components/Section/SectionBrand";
import SectionSuggestProduct from "@/components/Section/SectionSuggestProduct";
import Image from "next/image";
import TimerHMS from "@/components/Timer/TimerHMS";
import {Metadata} from "next";
import SectionTrustedBrand from "@/components/Section/SectionTrustedBrand";
import SectionDesktopLinks from "@/components/Section/SectionDesktopLinks";
import {HomePageResponse} from "@/services/types/homePage";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://tajhizland.com";
    const description = "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...";
    // آدرس ثابت و مطلق؛ قبلا آدرسِ هش‌دارِ باندل استفاده می‌شد که با هر بیلد عوض می‌شود.
    const image = `${siteUrl}/logo.png`;

    return {
        title: "تجهیزلند",
        description,
        alternates: {canonical: siteUrl},
        twitter: {
            card: "summary",
            title: "تجهیزلند",
            description,
            images: image,
        },
        openGraph: {
            siteName: "تجهیزلند",
            title: "تجهیزلند",
            description,
            images: image,
            url: siteUrl,
            type: "website",
            locale: "fa_IR",
        },
        robots: "index, follow",
    };
}

const EMPTY_HOMEPAGE: HomePageResponse = {
    campaign: null,
    pending_campaign: null,
    discount: null,
    desktopSliders: [],
    mobileSliders: [],
    banners: [],
    banners2: [],
    banners3: [],
    banners4: [],
    banners5: [],
    bannersStock: [],
    bannersCast: [],
    topDiscountedProducts: [],
    specialProducts: [],
    randomProducts: [],
    homepageCategories: [],
    concepts: [],
    brands: [],
    trustedBrands: [],
    posters: [],
    vlogs: [],
    news: [],
};

export default async function Homepage() {
    let response: HomePageResponse = EMPTY_HOMEPAGE;
    try {
        response = (await homePage()) ?? EMPTY_HOMEPAGE;
    } catch (e) {
        console.error("homePage API failed:", e);
    }

    const campaign = response.campaign;
    const heroDesktop = campaign?.desktopSliders?.length ? campaign.desktopSliders : response.desktopSliders;
    const heroMobile = campaign?.mobileSliders?.length ? campaign.mobileSliders : response.mobileSliders;
    const heroBanners = campaign?.homepageBanner?.length ? campaign.homepageBanner : response.banners;
    const twinBanners = campaign?.homepage2Banner?.length ? campaign.homepage2Banner : response.banners2;
    // بک‌اندِ قدیمی‌تر این کلید را ندارد، پس نبودش نباید صفحه را بشکند.
    const randomProducts = response.randomProducts ?? [];

    /*
     * اسکیمای Organization و WebSite.
     *
     * logo همان چیزی است که گوگل برای نمایش لوگوی سایت لازم دارد و قبلا اصلا
     * وجود نداشت. آدرسش باید مطلق، مربع و پایدار باشد (public/logo.png).
     */
    const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "https://tajhizland.com";
    const logoUrl = `${siteUrl}/logo.png`;

    const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${siteUrl}/#organization`,
                "name": "تجهیزلند",
                "alternateName": ["tajhizland", "Tajhizland"],
                "url": siteUrl,
                "logo": {
                    "@type": "ImageObject",
                    "@id": `${siteUrl}/#logo`,
                    "url": logoUrl,
                    "contentUrl": logoUrl,
                    "width": 512,
                    "height": 512,
                    "caption": "تجهیزلند",
                },
                "image": {"@id": `${siteUrl}/#logo`},
                "description": "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی، رستوران، فست فود، کافی شاپ و...",
            },
            {
                "@type": "WebSite",
                "@id": `${siteUrl}/#website`,
                "name": "تجهیزلند",
                "url": siteUrl,
                "inLanguage": "fa-IR",
                "publisher": {"@id": `${siteUrl}/#organization`},
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": `${siteUrl}/search/{search_term_string}`,
                    },
                    "query-input": "required name=search_term_string",
                },
            },
        ],
    };

    return (
        <>
            {/*
              JSON-LD باید در HTML سمت سرور باشد. next/script با استراتژی پیش‌فرض
              اسکریپت را سمت کلاینت تزریق می‌کند و ممکن است خزنده‌ی گوگل آن را نبیند.
            */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
            />

            <div className="relative overflow-hidden lg:mt-10 dark:bg-neutral-900">

                {/* Hero */}
                {
                    response.campaign &&
                    <div
                        className={`w-full h-20 flex items-center justify-center gap-4 mb-4 sm:mb-0 `}
                        style={{background: `${response.campaign.background_color}`}}

                    >
                        <Image
                            width={150}
                            height={50}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/campaign/${response.campaign.logo}`}
                            alt={"campaign"}/>
                        <TimerHMS date={response.campaign.end_date}/>
                        <div className={"font-bold hidden sm:block sm:text-sm"}
                             style={{color: `${response.campaign.color}`}}>
                            <p>تا پایان</p>
                            <p>
                                {response.campaign.title}
                            </p>
                        </div>
                    </div>

                }
                {
                    response.pending_campaign && !response.campaign &&
                    <div
                        className={`w-full h-20 flex items-center justify-center gap-4 mb-4 sm:mb-0 `}
                        style={{background: `${response.pending_campaign.background_color}`}}

                    >
                        <Image
                            width={150}
                            height={50}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/campaign/${response.pending_campaign.logo}`}
                            alt={"campaign"}/>
                        <TimerHMS date={response.pending_campaign.start_date}/>

                    </div>

                }

                <div className="hidden sm:block">
                    <Hero data={heroDesktop}/>
                </div>
                <div className="block sm:hidden container">
                    <div className="rounded-2xl overflow-hidden !p-0">
                        <MobileHero data={heroMobile}/>
                    </div>
                </div>
                <SectionDesktopLinks />


                {/* Banner Slider */}
                <div className="dark:bg-neutral-900">
                    <SectionBannerSlider data={heroBanners}/>
                </div>


                {/* New Discount Slider */}
                {response.topDiscountedProducts.length > 0 && <div className="container my-0 px-5 lg:px-0 relative overflow-hidden">
                    <SectionNewDiscountSlider
                        campaign={campaign ?? undefined}
                        timer={response.discount?.discount_expire_time}
                        data={response.topDiscountedProducts}
                        subHeading={""}
                    />
                    <div
                        style={{backgroundColor: campaign ? campaign.background_color : "#fcb415"}}
                        className="absolute w-24 h-24 rounded-full -left-[4rem] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.6}
                                 stroke="currentColor" className="h-12 w-12">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                        </div>
                    </div>
                </div>}


                {/* منتخب تجهیزلند: محصولات تصادفی از دسته‌بندی‌های تعریف‌شده در پنل */}
                {randomProducts.length > 0 &&
                    <div className="container px-5 lg:px-0 mt-5 lg:mt-10">
                        <SectionRandomProducts data={randomProducts}/>
                    </div>}

         {response.bannersCast.length > 0 &&
                    <div className={"mt-5 lg:mt-10 container p-0"}> <SectionSingleBanner
                        w={"aspect-w-5 sm:aspect-w-13 lg:aspect-w-14"}
                        h={"aspect-h-1"}
                        banner={response.bannersCast[0]}
                    />
                    </div>}

                {/* Main Sections */}
                <div className="container relative space-y-5 py-5 lg:space-y-10 lg:py-10 dark:bg-neutral-900">
                    <SectionTwinBanner banners={twinBanners}/>


                    {response.bannersStock.length > 0 &&
                        <SectionSingleBanner
                            w={"aspect-w-3 sm:aspect-w-4 lg:aspect-w-5"}
                            h={"aspect-h-1"}
                            banner={response.bannersStock[0]}
                        />}

                    <SectionBrand data={response.brands}/>
                    <SectionSuggestProduct/>
                    <div className="relative py-5 lg:py-10">
                        <BackgroundSection/>
                        <SectionConcept data={response.concepts}/>
                    </div>
                    <SectionTwinBanner banners={response.banners3}/>
                    <div className="py-5 lg:py-10 border-t border-b border-slate-200 dark:border-slate-700">
                        <SectionPromoFeatures/>
                    </div>
                    <SectionPromo1 logo={response.posters[0]?.image ?? ""}/>
                    <SectionHomepageCategory data={response.homepageCategories}/>
                    <SectionPromo2 logo={response.posters[1]?.image ?? ""}/>
                    <SectionSpecialSlider data={response.specialProducts}/>
                    <SectionTwinBanner banners={response.banners4}/>
                    <SectionHomepageVlog data={response.vlogs}/>
                    {response.banners5.length > 0 && <SectionSingleBanner banner={response.banners5[0]}/>}
                </div>

                <SectionHomepageBlog data={response.news}/>
                <SectionTrustedBrand data={response.trustedBrands} />
              </div>
        </>
    );
}
