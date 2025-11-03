import { Metadata } from "next";
import React from "react";
import logo from "@/images/lightLogo.png";
import { homePage } from "@/services/api/shop/homePage";
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
import SectionBrand from "@/components/Section/SectionBrand";
import SectionSuggestProduct from "@/components/Section/SectionSuggestProduct";
import Script from "next/script";

export const dynamic = 'force-dynamic';

// export async function generateMetadata(): Promise<Metadata> {
//   try {
//     const siteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || "";

//     return {
//       title: "تجهیزلند",
//       description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
//       twitter: {
//         title: "تجهیزلند",
//         description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
//         images: logo?.src || `${siteUrl}/images/lightLogo.png`,
//       },
//       openGraph: {
//         title: "تجهیزلند",
//         description: "فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...",
//         images: logo?.src || `${siteUrl}/images/lightLogo.png`,
//         url: siteUrl,
//         type: "website",
//       },
//       robots: "index, follow",
//     };
//   } catch (e) {
//     console.error("Metadata generation failed:", e);
//     return { title: "تجهیزلند" };
//   }
// }

export default async function Homepage() {
  let response: any = {};
  try {
    response = await homePage();
  } catch (e) {
    console.error("homePage API failed:", e);
    response = {};
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "تجهیزلند",
    "alternateName": ["tajhizland", "j[idcgkn"],
    "url": "https://tajhizland.ir"
  }
  return (
    <>
      <Script type="application/ld+json" id="schema">
        {JSON.stringify(structuredData)}
      </Script>

      <div className="relative overflow-hidden lg:mt-10 dark:bg-neutral-900">

        {/* Hero */}
        <div className="hidden sm:block">
          <Hero data={response.desktopSliders?.data || []} />
        </div>
        <div className="block sm:hidden container">
          <div className="rounded-2xl overflow-hidden !p-0">
            <MobileHero data={response.mobileSliders?.data || []} />
          </div>
        </div>

        {/* Banner Slider */}
        <div className="dark:bg-neutral-900">
          <SectionBannerSlider data={response.banners?.data || []} />
        </div>

        {/* New Discount Slider */}
        <div className="container my-0 px-5 lg:px-0 relative overflow-hidden">
          <SectionNewDiscountSlider
            timer={response?.discount?.discount_expire_time}
            data={response.popularProducts?.data || []}
            subHeading={""}
          />
          <div className="absolute w-24 h-24 bg-[#fcb415] rounded-full -left-[4rem] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.6} stroke="currentColor" className="h-12 w-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Sections */}
        <div className="container relative space-y-5 py-5 lg:space-y-10 lg:py-10 dark:bg-neutral-900">
          <SectionTwinBanner banners={response.banners2?.data || []} />
          <SectionBrand data={response.brands?.data || []} />
          <SectionSuggestProduct />
          <div className="relative py-5 lg:py-10">
            <BackgroundSection />
            <SectionConcept data={response.concepts?.data || []} />
          </div>
          <SectionTwinBanner banners={response.banners3?.data || []} />
          <div className="py-5 lg:py-10 border-t border-b border-slate-200 dark:border-slate-700">
            <SectionPromoFeatures />
          </div>
          <SectionPromo1 logo={response.posters?.data?.[0]?.image || ""} />
          <SectionHomepageCategory data={response.homepageCategories?.data || []} />
          <SectionPromo2 logo={response.posters?.data?.[1]?.image || ""} />
          <SectionSpecialSlider data={response.specialProducts?.data || []} />
          <SectionTwinBanner banners={response.banners4?.data || []} />
          <SectionHomepageVlog data={response.vlogs?.data || []} />
          {response.banners5?.data?.length > 0 && <SectionSingleBanner banner={response.banners5.data[0]} />}
        </div>

        <SectionHomepageBlog data={response.news?.data || []} />
      </div>
    </>
  );
}
