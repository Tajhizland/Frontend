import React  from "react";
import {
    NoSymbolIcon,
    ClockIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import {StarIcon} from "@heroicons/react/24/solid";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import AccordionInfo from "@/components/AccordionInfo";
import Policy from "../../product-detail/Policy";
import {findProductByUrl} from "@/services/api/shop/product";
import ProductSidebar from "@/app/(shop)/product/ProductSidebar";
import ProductImage from "../ProductImage";
import ProductComment from "../ProductComment";
import SectionSliderProductCard2 from "@/components/SectionSliderProductCard2";
import {Metadata} from "next";
import Script from "next/script";
import {stripHTML} from "@/hooks/StripHtml";
import TextExpander from "@/shared/TextExpander/TextExpander";
import VideoSlider from "@/components/VideoSlider";
import VideoSwiper from "@/components/VideoSwiper";
import SectionVideo from "@/components/SectionVideo";


interface ProductPageProps {
    params: {
        url: [string];
    }
}
export async function generateMetadata({params}: ProductPageProps): Promise<Metadata> {
    let productResponse = await findProductByUrl(decodeURIComponent(params.url.join("/")));
    let product = productResponse.product;

    return {
        title: product.meta_title??product.name,
        description: product.meta_description??stripHTML(product.description),
        twitter:{
            title: product.meta_title??product.name,
            description: product.meta_description??stripHTML(product.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,

        },
        openGraph:{
            title: product.meta_title??product.name,
            description: product.meta_description??stripHTML(product.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,
            url:`${process.env.NEXT_PUBLIC_WEBSITE_URL}/product/${product.url}`,
             type:"website",
         },
        robots:"index , follow",

    }
}

const ProductDetailPage2 = async ({params}: ProductPageProps) => {
    let productResponse = await findProductByUrl(decodeURIComponent(params.url.join("/")));
    let product = productResponse.product;
    let relatedProduct = productResponse.relatedProduct.data;

    const structuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,
        "description": product.description,
        "sku": product.id,
        "offers": {
            "@type": "Offer",
            "url": product.url,
            "priceCurrency": "IRR",
            "price": product.min_price,
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock"
        },
        "brand": {
            "@type": "Brand",
            "name": product.brand
        }
    };

    const renderStatus = () => {
        let status="";
        product.colors.data.map((item)=>{
           if (item.statusLabel!=""){
               status=item.statusLabel;
           }
        })
         if (!status) {
            return null;
        }
        const CLASSES =
            "text-sm flex items-center text-slate-700 text-slate-900 dark:text-slate-300";
        if (status == "new") {
            return (
                <div className={CLASSES}>
                    <SparklesIcon className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none">محصول جدید</span>
                </div>
            );
        }
        if (status == "discount") {
            return (
                <div className={CLASSES}>
                    <IconDiscount className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none">{product.min_discounted_price} % تخفیف </span>
                </div>
            );
        }
        if (status === "limited edition") {
            return (
                <div className={CLASSES}>
                    <ClockIcon className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none">{status}</span>
                </div>
            );
        }
        return null;
    };
    const renderOption = () => {
        const options = product.productOptions.data
            .map((item) => `<tr class="border "><td class="border ">${item.option_title}</td><td> ${item.value}</td></tr>`)
            .join("");

        return `<div class="relative  ">
    <table class="w-full text-sm text-center text-gray-500  border">${options}</table></div>`;
    };
    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap !space-y-6">
                <div>
                    <h2 className="text-2xl md:text-3xl font-semibold dark:text-white">
                        {product.name}
                    </h2>
                    <div className="flex items-center mt-4 sm:mt-5">
                         {renderStatus()}
                        <div className="mr-auto">
                            <LikeSaveBtns like={product.favorite} productId={product.id}/>
                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="block lg:hidden">
                    <ProductSidebar product={product}/>
                 </div>

                {/*  */}
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/*  */}
                <TextExpander text={product.description} />
                <AccordionInfo
                    data={[
                        {
                            name: "مشخصات محصول",
                            content: renderOption()

                        },
                    ]}/>
                <SectionVideo intro_video={"https://tajhizland.com/video/intro_video.mp4"} unboxing_video={"https://tajhizland.com/video/intro_video.mp4"} usage_video={"https://tajhizland.com/video/intro_video.mp4"} intro_video_description={product.intro_video_description} unboxing_video_description={product.unboxing_video_description} usage_video_description={product.usage_video_description} />
                {/*<SectionVideo intro_video={product.intro_video} unboxing_video={product.unboxing_video} usage_video={product.usage_video} intro_video_description={product.intro_video_description} unboxing_video_description={product.unboxing_video_description} usage_video_description={product.usage_video_description} />*/}
                    {/*<VideoSwiper intro_video={product.intro_video} unboxing_video={product.unboxing_video} usage_video={product.usage_video} />*/}
            </div>
        );
    };
    const renderSection2 = () => {
        return (
            <div className="listingSection__wrap !border-b-0 !pb-0 dark:text-white">
                <h2 className="text-2xl font-semibold">بررسی تخصصی</h2>
                {/* <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div> */}
                <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl  dark:text-white">
                    <div dangerouslySetInnerHTML={{__html: product.review}}/>

                </div>
                {/* ---------- 6 ----------  */}
                <div className="lg:hidden  ">
                    <Policy />
                </div>
            </div>
        );
    };

    return (
        <>
            <Script type="application/ld+json" id="schema">
                {JSON.stringify(structuredData)}
            </Script>
            <div className={`ListingDetailPage nc-ProductDetailPage2 dark:bg-neutral-900`}>
                <ProductImage productImages={product.images.data}/>
                {/* MAIn */}
                <main className="container relative z-10 mt-9 sm:mt-11 flex ">
                    {/* CONTENT */}
                    <div className="w-full lg:w-3/5 xl:w-2/3 space-y-10 lg:pl-14 lg:space-y-14">
                        {renderSection1()}
                        {renderSection2()}
                    </div>

                    {/* SIDEBAR */}
                    <div className="flex-grow">
                        <div className="hidden lg:block sticky top-36 dark:bg-black/20">
                            {/*{renderSectionSidebar()}*/}
                            <ProductSidebar product={product}/>
                        </div>
                    </div>
                </main>

                {/* OTHER SECTION */}
                <div className="container pb-24 lg:pb-28 pt-14 space-y-14">
                    <hr className="border-slate-200 dark:border-slate-700"/>
                    {/*
        {renderReviews()} */}
                    <ProductComment comments={product.comments.data} productId={product.id}/>

                    <hr className="border-slate-200 dark:border-slate-700"/>
                     <SectionSliderProductCard2
                        heading="محصولات مرتبط"
                        subHeading=""
                        headingFontClassName="text-2xl font-semibold"
                        data={relatedProduct}
                        headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
                    />
                </div>

                {/* MODAL VIEW ALL REVIEW */}


            </div>
        </>
    );
};

export default ProductDetailPage2;
