"use client"
import React, {useState} from "react";
import {
    ClockIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

import ProductSidebar from "@/components/Product/ProductSidebar";
import ProductImage from "@/components/Product/ProductImage";
import ProductComment from "@/components/Product/ProductComment";
import TextExpander from "@/shared/TextExpander/TextExpander";
import {ProductResponse} from "@/services/types/product";
import Policy from "@/components/Product/Policy";
import LikeSaveBtns from "@/shared/Button/LikeSaveBtns";
import Accordion from "@/components/Accordion/Accordion";
import Badge from "@/shared/Badge/Badge";
import SectionProductVideo from "@/components/Section/SectionProductVideo";
import SectionGroup from "@/components/Group/SectionGroup";
import Link from "next/link";
import {MdCompare} from "react-icons/md";
import ShareButton from "@/shared/Button/ShareButton";
import {GroupProductResponse} from "@/services/types/groupProduct";
import SectionLinkedProductSlider from "@/components/Section/SectionLinkedProductSlider";

export default function SectionGroupInfo({groupItems, relatedProduct}:
                                         {
                                             groupItems: GroupProductResponse[] ,
                                             relatedProduct:ProductResponse[]
                                         }
) {

    const [product, setProduct] = useState<ProductResponse | undefined>(groupItems[0].product);

    if (!product)
        return;
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
                        <div className="mr-auto flex justify-end gap-2 items-center w-full">

                            <LikeSaveBtns like={product.favorite} productId={product.id}/>
                            <Link href={"/compare/" + product.id}>
                                <div
                                    className=" w-fit gap-2 flex items-center justify-center px-4 py-2 rounded-xl bg-white text-slate-800 cursor-pointer text-sm  z-10"
                                >
                                    <MdCompare/>
                                    <span>
                                        مقایسه کالا
                                            </span>
                                </div>
                            </Link
                            >
                            <ShareButton/>

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

                <div
                    className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl  dark:text-white html_description">
                    <div dangerouslySetInnerHTML={{__html: product.review}}/>
                </div>
                {/* ---------- 6 ----------  */}

            </div>
        );
    };

    return (
        <>

            <div className={`ListingDetailPage nc-ProductDetailPage2 dark:bg-neutral-900`}>
                {product.images.data.length > 0 && <ProductImage productImages={product.images.data}/>}
                {/* MAIn */}
                <main className="container relative z-10 mt-9 sm:mt-11 flex ">
                    {/* CONTENT */}
                    <div className="w-full lg:w-3/5 xl:w-2/3 space-y-10 lg:pl-14 lg:space-y-14">
                        {renderSection1()}
                    </div>

                    {/* SIDEBAR */}
                    <div className="flex-grow">
                        <div className="hidden lg:block sticky top-36 dark:bg-black/20">
                            <SectionGroup groupItems={groupItems} setProduct={setProduct}/>

                        </div>
                    </div>
                </main>

                {/* OTHER SECTION */}
                <div className="container pb-24 lg:pb-28 pt-14 space-y-14">
                    <hr className="border-slate-200 dark:border-slate-700"/>
                    {/*
        {renderReviews()} */}
                    <ProductComment comments={product.comments.data} productId={product.id}/>
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
