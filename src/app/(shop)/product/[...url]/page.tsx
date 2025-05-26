import React from "react";
import {
    ClockIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

import {findProductByUrl} from "@/services/api/shop/product";
import ProductSidebar from "@/components/Product/ProductSidebar";
import ProductImage from "../../../../components/Product/ProductImage";
import ProductComment from "../../../../components/Product/ProductComment";
import {Metadata} from "next";
import Script from "next/script";
import {stripHTML} from "@/hooks/StripHtml";
import TextExpander from "@/shared/TextExpander/TextExpander";
import {ProductResponse} from "@/services/types/product";
import Policy from "../../../../components/Product/Policy";
import SectionLinkedProductSlider from "@/components/Section/SectionLinkedProductSlider";
import IconDiscount from "@/components/Icon/IconDiscount";
import LikeSaveBtns from "@/shared/Button/LikeSaveBtns";
import Accordion from "@/components/Accordion/Accordion";
import SectionVideo from "@/components/Section/SectionVideo";
import Badge from "@/shared/Badge/Badge";
import SectionProductVideo from "@/components/Section/SectionProductVideo";
import SectionGroup from "@/components/Group/SectionGroup";
import Link from "next/link";
import {FaCodeCompare} from "react-icons/fa6";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";


interface ProductPageProps {
    params: Promise<{
        url: [string];
    }>
}

// export async function generateStaticParams() {
//     const products = await productSitemap();
//     return products.map((product) => ({
//         url: product.url.split("/"),
//     }));
// }

export async function generateMetadata(props: ProductPageProps): Promise<Metadata> {
    const params = await props.params;
    let productResponse = await findProductByUrl(decodeURIComponent(params.url.join("/")));
    let product = productResponse.product;

    return {
        title: product.meta_title ?? product.name,
        description: product.meta_description ?? stripHTML(product.description),
        twitter: {
            title: product.meta_title ?? product.name,
            description: product.meta_description ?? stripHTML(product.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,

        },
        openGraph: {
            title: product.meta_title ?? product.name,
            description: product.meta_description ?? stripHTML(product.description),
            images: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product?.images?.data[0]?.url}`,
            url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/product/${product.url}`,
            type: "website",
        },
        robots: "index , follow",
        other: {
            product_id: product?.id,
            product_name: product?.name,
            product_price: product?.min_price,
            product_old_price: product?.min_price,
            availability: product.status == 1 ? "instock" : "outofstock",
            guarantee: product?.guaranties.data[0] ? product?.guaranties.data[0]?.name ?? "" : ""
        }

    }
}

const ProductDetailPage2 = async (props: ProductPageProps) => {
    const params = await props.params;
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

    const renderMixDiscount = (product: ProductResponse) => {
        let maxDiscount = 0;
        product.colors.data.map((item) => {
            if (item.discount > maxDiscount) {
                maxDiscount = item.discount;
            }
        })
        return maxDiscount;
    }

    const renderStatus = () => {
        let status = "";
        product.colors.data.map((item) => {
            if (item.statusLabel != "") {
                status = item.statusLabel;
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
                    <Badge color={"red"} name={
                        <span className="mr-1 leading-none  text-red-500 text-xs">
                             {renderMixDiscount(product)} % تخفیف
                         </span>
                    }/>
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
            .map((item) => (item.value && item.value != "" && item.value != " ") ? `<tr class=""><td class="py-4 text-neutral-600 dark:text-white ">${item.option_title}</td><td class="text-right text-black border-b dark:text-white "> ${item.value}</td></tr>` : "")
            .join("");

        return `<div class="relative  ">
    <table class="w-full text-sm text-center text-gray-500  dark:text-white rounded">${options}</table></div>`;
    };

    const renderAccordianData = () => {
        if (product.review) {
            return [
                {
                    name: "مشخصات محصول",
                    content: renderOption()

                },
                {
                    name: "بررسی تخصصی",
                    content: renderSection2()
                }
            ]

        } else {
            return [
                {
                    name: "مشخصات محصول",
                    content: renderOption()

                }
            ]
        }
    }
    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap !space-y-6">
                <div>
                    <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold dark:text-white">
                        {product.name}
                    </h2>
                    <div className="flex items-center mt-4 sm:mt-5">
                        {/*{renderStatus()}*/}
                        <div className="mr-auto flex justify-between gap-2 items-center w-full">
                            <Link href={"/compare/" + product.id}>
                                <div
                                    className=" w-fit gap-5 border  flex items-center justify-center px-4 py-2 rounded-xl bg-white text-slate-500 cursor-pointer hover:bg-slate-200 z-10"
                                >
                                         <FaCodeCompare/>
                                        <span>
                                        مقایسه محصول
                                            </span>
                                </div>
                            </Link>
                            <LikeSaveBtns like={product.favorite} productId={product.id}/>

                        </div>
                    </div>
                </div>
                {/*  */}
                <div className="block lg:hidden">
                    <ProductSidebar product={product}/>
                </div>

                {/*  */}
                {/*  */}
                <h2 className={"font-semibold block lg:hidden"}>توضیحات </h2>
                <TextExpander text={product.description}/>
                <Accordion
                    data={renderAccordianData()}/>
                {/*<SectionVideo intro_video={product.intro}*/}
                {/*              unboxing_video={product.unboxing}*/}
                {/*             usage_video={product.usage} />*/}

                <SectionProductVideo videos={product.videos.data}/>

                <div className="lg:hidden  ">
                    <Policy/>
                </div>

            </div>
        );
    };
    const renderSection2 = () => {
        return (
            <div className="listingSection__wrap !border-b-0 !pb-0 dark:text-white">

                <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl  dark:text-white">
                    <div dangerouslySetInnerHTML={{__html: product.review}}/>
                </div>
                {/* ---------- 6 ----------  */}

            </div>
        );
    };

    return (
        <>
            <Script type="application/ld+json" id="schema">
                {JSON.stringify(structuredData)}
            </Script>
            <div className={`ListingDetailPage nc-ProductDetailPage2 dark:bg-neutral-900`}>
                {product.images.data.length > 0 && <ProductImage productImages={product.images.data}/>}
                {/* MAIn */}
                <main className="container relative z-10 mt-9 sm:mt-11 flex ">
                    {/* CONTENT */}
                    <div className="w-full lg:w-3/5 xl:w-2/3 space-y-10 lg:pl-14 lg:space-y-14">
                        {renderSection1()}
                        {/* {renderSection2()} */}
                    </div>

                    {/* SIDEBAR */}
                    <div className="flex-grow">
                        <div className="hidden lg:block sticky top-36 dark:bg-black/20">
                            {/*{renderSectionSidebar()}*/}
                            {product.type == "product" && <ProductSidebar product={product}/>
                            }
                            {product.type == "group" && product.groupItems && product.groupItems.data &&
                                <SectionGroup groupItems={product.groupItems.data}/>
                            }
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
                    <SectionLinkedProductSlider
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
