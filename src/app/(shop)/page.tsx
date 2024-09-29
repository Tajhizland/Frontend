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
import SectionPromo3 from "@/components/SectionPromo3";
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
import Heading from "@/components/Heading/Heading";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
import SectionMagazine5 from "@/app/(shop)/blog/SectionMagazine5";
import { homePage } from "@/services/api/shop/homePage";

 async function PageHome() {
    const response= await homePage();
    console.log("homeResponse" , response)
  return (
    <div className="nc-PageHome relative overflow-hidden">
      <SectionHero2 />

      <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider data={response.popularCategories.data} />
      </div>

        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
            <SectionSliderProductCard
                data={response.popularProducts.data}
                subHeading={""}
                heading={"محصولات تخفیف دار"}
            />
            <div className="relative py-24 lg:py-32">
                <BackgroundSection/>
                <SectionGridMoreExplore data={response.concepts.data}/>
            </div>
            <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
                <SectionHowItWork/>
            </div>
            <SectionPromo1/>

            <SectionGridFeatureItems/>
            <SectionPromo2/>
            <SectionSliderLargeProduct cardStyle="style2" data={response.specialProducts.data}/>

            <div className="relative py-24 lg:py-32">
                <BackgroundSection/>
                <div>
                    <Heading rightDescText="From the Ciseco blog">
                        The latest news
                    </Heading>
                    <SectionMagazine5/>
                    <div className="flex mt-16 justify-center">
                        <ButtonSecondary>Show all blog articles</ButtonSecondary>
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
