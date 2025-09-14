"use client";

import React, {FC, useState} from "react";
import {ClockIcon, SparklesIcon} from "@heroicons/react/24/outline";
import {StarIcon} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import {ProductResponse} from "@/services/types/product";
import {addToFavorite, deleteFromFavorite} from "@/services/api/shop/favorite";
import {useQueryClient} from "react-query";
import {Route} from "next";
import Badge from "@/shared/Badge/Badge";
import IconDiscount from "@/components/Icon/IconDiscount";
import LikeButton from "@/shared/Button/LikeButton";
import Prices from "@/components/Price/Prices";
import SmallTimer from "@/components/Timer/SmallTimer";

export interface ProductCardProps {
    className?: string;
    data?: ProductResponse;
}

const ProductCard2: FC<ProductCardProps> = ({
                                                className = "",
                                                data,
                                            }) => {


    const [variantActive, setVariantActive] = useState(0);
    const [showModalQuickView, setShowModalQuickView] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient(); // درست است
    async function likeHandle(like: boolean) {
        if (like) {
            let response = await addToFavorite({productId: data?.id as number})
            toast.success(response?.message as string)
        } else {
            let response = await deleteFromFavorite({productId: data?.id as number})
            toast.success(response?.message as string)

        }
        queryClient.invalidateQueries(['get_favorite']);
    }

    const renderStatus = () => {
        let status = "";
        let discounted = 0;
        data?.colors.data.map((item) => {
            if (item.statusLabel != "") {
                status = item.statusLabel;
                if (item.discount > 0 && item.discountedPrice < item.price) {
                    discounted = item.discount;
                }
            }
        })
        if (!status) {
            return null;
        }
        const CLASSES =
            " flex items-center text-slate-700 text-slate-900 dark:text-slate-300  dark:bg-slate-900 absolute top-3 start-3 bg-white rounded-full p-1 lg:p-2 text-xs";
        if (status == "new") {
            return (
                <div className={CLASSES}>
                    <SparklesIcon className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none">محصول جدید</span>
                </div>
            );
        }
        if (discounted != 0) {
            return (
                <div className={CLASSES}>
                    <Badge color={"discount"} name={
                        <span className="mr-1 leading-none    text-xs">{discounted}
                            <b>
                                %
                            </b>
                        </span>
                    }/>
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
    const renderGuaranty = () => {
        if (data?.guaranty) {
            return <div
                className={" flex items-center  dark:text-slate-300 absolute top-12 start-3 bg-white rounded-full p-2 text-xs"}
            ><NcImage
                containerClassName="flex aspect-w-11 aspect-h-12 w-4 h-4  lg:w-8 lg:h-8"
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/guaranty/${data?.guaranty?.icon}`}
                className="object-cover w-full h-full drop-shadow-xl"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                alt="guaranty"
            /></div>
        }
        return null;
    };

    const renderVariants = () => {

        return (
            <div className="flex gap-1 md:gap-1.5">
                {data && data.colors && data?.colors.data.map((color, index) => (
                    <div
                        key={index}
                        onClick={() => setVariantActive(index)}
                        className={`relative w-4 h-4  lg:w-6 lg:h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive == index ? "shadow-lg" : ""}`}
                        title={color.color_name}
                    >
                        <div style={{backgroundColor: color.color_code}}
                             className={`absolute inset-0.5 rounded-full z-0  `}
                        ></div>
                    </div>
                ))}
            </div>
        );
    };
    const checkStock = (product: ProductResponse) => {
        let hasStock = false;
        product.colors.data.map((item) => {
            if (item.stock > 0 && (item.status == 1 || item.status == 2)) {
                hasStock = true;
                return hasStock;
            }
        })
        return hasStock;
    }
    const renderMinPrice = (product: ProductResponse) => {
        let minPrice = product?.colors?.data[0]?.price;
        let minDiscountedPrice = product?.colors?.data[0]?.discountedPrice;
        product.colors.data.map((item) => {
            if (item.price < minPrice && item.status == 1 && item.price > 0) {
                minPrice = item.price;
                minDiscountedPrice = item.discountedPrice;
            }
        })

        if (checkStock(product)) {
            if (minDiscountedPrice == minPrice)
                return <Prices price={minPrice}/>
            else
                return <div className={"flex items-center gap-2"}>
                    <del className={"text-xs text-red-500"}>
                        {
                            new Intl.NumberFormat('fa').format(minPrice)
                        }
                    </del>
                    <Prices price={minDiscountedPrice}/>
                </div>

        }
        return <Badge color={"red"} name={"ناموجود"}/>;
    }

    const renderMixDiscountTime = () => {
        let timer = null;
        const now = new Date();

        data?.colors.data.forEach((item) => {
            if (
                item.discount_expire_time &&
                item.discountedPrice != item.price
            ) {
                const expireDate = new Date(item.discount_expire_time);
                if (expireDate > now) {
                    timer = item.discount_expire_time;
                }
            }
        });

        return timer;
    };

    return (
        <>
            <div
                style={{direction: "rtl"}}
                className={`nc-ProductCard relative flex flex-col bg-white dark:bg-slate-800 p-1 ${className}`}
            >
                <Link href={"/product/" + data?.url as Route} className="absolute inset-0"
                      aria-label={"product"}></Link>
                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group border">

                    <Link href={"/product/" + data?.url as Route} className="block " aria-label={"product"}>
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 "
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${data?.images?.data[0]?.url}`}

                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />

                    </Link>
                    <LikeButton likeHandle={likeHandle} liked={data?.favorite} className="absolute top-3 end-3 z-10"/>
                    {renderStatus()}
                    {renderGuaranty()}

                </div>

                <div className="space-y-1 md:space-y-2 px-2.5 pt-1 sm:pt-4 pb-2.5">
                    {renderVariants()}

                    <div>
                        <h2 className="nc-ProductCard__title text-xs md:text-sm xl:text-base font-semibold transition-colors text-right dark:text-white  min-h-[2lh] h-[2lh] leading-[0.7lh] line-clamp-2">
                            {data?.name}
                        </h2>
                    </div>

                    <div
                        className="flex flex-col gap-y-2 sm:flex-row justify-between items-start  text-xs sm:text-base ">
                        {data && renderMinPrice(data)}
                        {/*          <div className="hidden lg:flex items-center mb-0.5">*/}
                        {/*              <StarIcon className="w-5 h-5 pb-[1px] text-amber-400"/>*/}
                        {/*              <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">*/}
                        {/*  {data?.rating || ""} ({data?.comments.data.length || 0} نظر)*/}
                        {/*</span>*/}
                        {/*          </div>*/}


                    </div>
                    <div className={"flex justify-end"}>
                        {renderMixDiscountTime() != null &&

                            <SmallTimer date={renderMixDiscountTime() ?? ""}/>
                        }
                    </div>

                </div>
            </div>

            {/* QUICKVIEW */}

        </>
    );
};

export default ProductCard2;
