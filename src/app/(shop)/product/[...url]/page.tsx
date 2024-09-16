import React, {ReactNode} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import {StarIcon} from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import {PRODUCTS} from "@/data/data";
import {
    NoSymbolIcon,
    ClockIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import {findProductByUrl} from "@/services/api/shop/product";

const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

interface ProductPageProps {
    params: {
        url: string;
    }
}

const ProductDetailPage = async ({params}: ProductPageProps) => {
    const {sizes, variants, status, allOfSizes, image} = PRODUCTS[0];
    let product = await findProductByUrl(params.url[0]);

    const renderOption = () => {
        const options = product.productOptions.data
            .map((item) => `<li>${item.option_title}: ${item.value}</li>`)
            .join("");

        return `<ul>${options}</ul>`;
    };
    const renderStatus = () => {
        if (!status) {
            return null;
        }
        const CLASSES =
            "absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 nc-shadow-lg rounded-full flex items-center justify-center text-slate-700 text-slate-900 dark:text-slate-300";
        if (status === "New in") {
            return (
                <div className={CLASSES}>
                    <SparklesIcon className="w-3.5 h-3.5"/>
                    <span className="ml-1 leading-none">{status}</span>
                </div>
            );
        }
        if (status === "50% Discount") {
            return (
                <div className={CLASSES}>
                    <IconDiscount className="w-3.5 h-3.5"/>
                    <span className="ml-1 leading-none">{status}</span>
                </div>
            );
        }
        if (status === "Sold Out") {
            return (
                <div className={CLASSES}>
                    <NoSymbolIcon className="w-3.5 h-3.5"/>
                    <span className="ml-1 leading-none">{status}</span>
                </div>
            );
        }
        if (status === "limited edition") {
            return (
                <div className={CLASSES}>
                    <ClockIcon className="w-3.5 h-3.5"/>
                    <span className="ml-1 leading-none">{status}</span>
                </div>
            );
        }
        return null;
    };

    const renderSectionContent = () => {
        return (
            <div className="space-y-7 2xl:space-y-8">
                {/* ---------- 1 HEADING ----------  */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        {product.name}
                    </h2>

                    <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                        {/* <div className="flex text-xl font-semibold">$112.00</div> */}
                        <Prices
                            contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                            price={product.min_price}
                        />

                        <div className="h-7 border-l border-slate-300 dark:border-slate-700"></div>

                        <div className="flex items-center">
                            <a
                                href="#reviews"
                                className="flex items-center text-sm font-medium"
                            >
                                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400"/>
                                <div className="ml-1.5 flex">
                                    <span>{product.rating}</span>
                                    <span className="block mx-2">·</span>
                                    <span className="text-slate-600 dark:text-slate-400 underline">
                    {
                        product.comments.length
                    }
                                        نظر
                  </span>
                                </div>
                            </a>
                            <span className="hidden sm:block mx-2.5">·</span>
                            <div className="hidden sm:flex items-center text-sm">
                                <SparklesIcon className="w-3.5 h-3.5"/>
                                <span className="ml-1 leading-none">{status}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}


                {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
                <div className="flex space-x-3.5">
                    <div
                        className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
                        <NcInputNumber
                        />
                    </div>
                    <ButtonPrimary
                        className="flex-1 flex-shrink-0"
                    >
                        <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5"/>
                        <span className="mr-3">افزودن به سبد خرید</span>
                    </ButtonPrimary>
                </div>

                {/*  */}
                <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
                {/*  */}

                {/* ---------- 5 ----------  */}

                <AccordionInfo
                    data={[
                        {
                            name: "توضیحات",
                            content: product.description
                        },
                        {
                            name: "بررسی اجمالی",
                            content: product.study

                        },
                        {
                            name: "مشخصات محصول",
                            content: renderOption()

                        },

                    ]}/>

                {/* ---------- 6 ----------  */}
                <div className="hidden xl:block">
                    <Policy/>
                </div>
            </div>
        );
    };

    const renderDetailSection = () => {
        return (
            <div className="">
                <h2 className="text-2xl font-semibold">بررسی تخصصی</h2>
                <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
                    <div dangerouslySetInnerHTML={{__html: product.review}}/>

                </div>
            </div>
        );
    };

    const renderReviews = () => {
        return (
            <div className="">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold flex items-center">
                    <StarIcon className="w-7 h-7 mb-0.5"/>
                    <span className="ml-1.5"> 4,87 · 142 Reviews</span>
                </h2>

                {/* comment */}
                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
                        <ReviewItem/>
                        <ReviewItem
                            data={{
                                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes.
                  If you’re unsure which hoodie to pick.`,
                                date: "December 22, 2021",
                                name: "Stiven Hokinhs",
                                starPoint: 5,
                            }}
                        />
                        <ReviewItem
                            data={{
                                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie.
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                                date: "August 15, 2022",
                                name: "Gropishta keo",
                                starPoint: 5,
                            }}
                        />
                        <ReviewItem
                            data={{
                                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed.
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                                date: "December 12, 2022",
                                name: "Dahon Stiven",
                                starPoint: 5,
                            }}
                        />
                    </div>


                </div>
            </div>
        );
    };

    return (
        <div className={`nc-ProductDetailPage `}>
            {/* MAIn */}
            <main className="container mt-5 lg:mt-11">
                <div className="lg:flex">
                    {/* CONTENT */}
                    <div className="w-full lg:w-[55%] ">
                        {/* HEADING */}
                        <div className="relative">
                            <div className="aspect-w-16 aspect-h-16 relative">
                                <Image
                                    fill
                                    sizes="(max-width: 640px) 100vw, 33vw"
                                    src={LIST_IMAGES_DEMO[0]}
                                    className="w-full rounded-2xl object-cover"
                                    alt="product detail 1"
                                />
                            </div>
                            {renderStatus()}
                            {/* META FAVORITES */}
                            <LikeButton className="absolute right-3 top-3 "/>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6 xl:gap-8 xl:mt-8">
                            {[LIST_IMAGES_DEMO[1], LIST_IMAGES_DEMO[2]].map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="aspect-w-11 xl:aspect-w-10 2xl:aspect-w-11 aspect-h-16 relative"
                                    >
                                        <Image
                                            sizes="(max-width: 640px) 100vw, 33vw"
                                            fill
                                            src={item}
                                            className="w-full rounded-2xl object-cover"
                                            alt="product detail 1"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pr-7 xl:pr-9 2xl:pr-10">
                        {renderSectionContent()}
                    </div>
                </div>

                {/* DETAIL AND REVIEW */}
                <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
                    <div className="block xl:hidden">
                        <Policy/>
                    </div>

                    {renderDetailSection()}

                    <hr className="border-slate-200 dark:border-slate-700"/>

                    {renderReviews()}

                    <hr className="border-slate-200 dark:border-slate-700"/>

                    {/* OTHER SECTION */}
                    <SectionSliderProductCard
                        heading="Customers also purchased"
                        subHeading=""
                        headingFontClassName="text-2xl font-semibold"
                        headingClassName="mb-10 text-neutral-900 dark:text-neutral-50"
                    />

                    {/* SECTION */}
                    <div className="pb-20 xl:pb-28 lg:pt-14">
                        <SectionPromo2/>
                    </div>
                </div>
            </main>

            {/* MODAL VIEW ALL REVIEW */}

        </div>
    );
};

export default ProductDetailPage;
