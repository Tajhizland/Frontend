"use client";

import React, {FC, useState} from "react";

import {ClockIcon, SparklesIcon} from "@heroicons/react/24/outline";
import {StarIcon} from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import {ProductResponse} from "@/services/types/product";
import {addToFavorite, deleteFromFavorite} from "@/services/api/shop/favorite";
import Badge from "@/shared/Badge/Badge";
import LikeButton from "@/shared/Button/LikeButton";
import Prices from "@/components/Price/Prices";
import SmallTimer from "@/components/Timer/SmallTimer";
import {FaCodeCompare} from "react-icons/fa6";
import {MdCompare, MdOutlineCompare} from "react-icons/md";

export interface ProductCardProps {
    className?: string;
    data?: ProductResponse;
    isLiked?: boolean;
    isProductInCompareList?: boolean;
    addToCompare?: () => void;
}

const ProductCardWithCompare: FC<ProductCardProps> = ({
                                                          className = "",
                                                          data,
                                                          addToCompare,
                                                          isProductInCompareList,
                                                          isLiked,
                                                      }) => {


    const [showModalQuickView, setShowModalQuickView] = useState(false);


    const renderVariants = () => {
        return (
            <div className="flex gap-1 sm:gap-1.5 justify-start  w-full">
                {data?.colors.data.map((color, index) => (
                    <div
                        key={index}
                        className={`relative w-4 h-4 sm:w-6 sm:h-6 rounded-full overflow-hidden z-10 border cursor-pointer`}
                        title={color.color_name}
                    >
                        <div
                            style={{backgroundColor: color.color_code}}
                            className={`absolute inset-0.5 rounded-full z-0 `}
                        ></div>
                    </div>
                ))}
            </div>
        );
    }

    async function likeHandle(like: boolean) {
        if (like) {
            let response = await addToFavorite({productId: data?.id as number})
            toast.success(response?.message as string)
        } else {
            let response = await deleteFromFavorite({productId: data?.id as number})
            toast.success(response?.message as string)

        }
    }

    const renderStatus = () => {
        let status = "";
        let discounted = 0;
        data?.colors.data.map((item) => {
            if (item.statusLabel != "") {
                status = item.statusLabel;
                if (item.discount > 0) {
                    discounted = item.discount;
                }
            }
        })
        if (!status) {
            return null;
        }
        const CLASSES =
            " flex items-center text-slate-700 text-slate-900 dark:text-slate-300 absolute top-0.5 start-0.5 sm:top-3 sm:start-3 bg-white rounded-full p-1 lg:p-2 text-xs";
        if (status == "new") {
            return (
                <div className={CLASSES}>
                    <SparklesIcon className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none text-xs">محصول جدید</span>
                </div>
            );
        }
        if (discounted != 0) {
            return (
                <div className={CLASSES}>
                    <Badge color={"discount"} name={
                        <span className="mr-1 leading-none  text-white text-xs">{discounted}
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
                    <span className="ml-1 leading-none text-xs">{status}</span>
                </div>
            );
        }
        return null;
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
            if (item.price < minPrice && (item.status == 1 || item.status == 2) && item.price > 0) {
                minPrice = item.price;
                minDiscountedPrice = item.discountedPrice;
            }
        })

        if (checkStock(product)) {
            if (minDiscountedPrice == minPrice)
                return <div className={"flex items-center gap-2 w-full justify-end"}>
                    <Prices price={minPrice}/>
                </div>
            else
                return <div className={"flex items-center gap-2 w-full justify-end"}>
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
                className={`nc-ProductCard relative flex flex-row items-center sm:flex-col bg-transparent group ${className}`}
            >
                <Link href={{pathname: "/product/" + data?.url}} className="absolute inset-0"></Link>

                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded sm:rounded-3xl overflow-hidden z-1 group w-28 sm:w-full border  group-hover:shadow">
                    <Link href={{pathname: "/product/" + data?.url}} className="block">
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 transition-all block group-hover:hidden"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${data?.images?.data[0]?.url}`}
                            priority
                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0 transition-all hidden group-hover:block"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${data?.images?.data[2]?.url ?? data?.images?.data[0]?.url}`}
                            priority
                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </Link>

                    <LikeButton liked={data?.favorite} likeHandle={likeHandle}
                                className="absolute top-3 end-3 z-10 hidden sm:flex"/>
                    <div title={'مقایسه'} className="absolute top-3 end-14 z-10 hidden sm:flex" onClick={addToCompare}>
                        <div
                            className={` w-fit gap-5  flex items-center justify-center px-2 py-2 rounded-full text-slate-500 cursor-pointer z-10  ${isProductInCompareList ? " bg-[#fcb415] text-white" : " hover:bg-slate-200 bg-white "}`}
                        >
                            <MdOutlineCompare className={"w-5 h-5"}/>
                        </div>
                    </div>
                    <div className={" "}>
                        {renderStatus()}
                    </div>
                    {/*{  renderGroupButtons()}*/}
                </div>

                <div className="space-y-1 px-2.5 sm:pt-5 sm:pb-2.5  w-full flex flex-col">
                    <div className={"flex justify-between items-center"}>
                        <div className="flex sm:hidden items-center mb-0.5 ">
                            <StarIcon className="w-5 h-5 pb-[1px] text-amber-400"/>
                            <span className="text-xs ms-1 text-slate-500 dark:text-slate-400">
                            {data?.rating || ""} ({data?.comments.data.length || 0} نظر)
                        </span>
                        </div>
                        {/*<LikeButton liked={data?.favorite} likeHandle={likeHandle}*/}
                        {/*            className="  z-10 sm:hidden flex"/>*/}
                        <div title={'مقایسه'} className=" z-10 flex sm:hidden" onClick={addToCompare}>
                            <div
                                className={` w-fit gap-5  flex items-center justify-center p-2 rounded-xl text-slate-500 cursor-pointer   z-10 ${isProductInCompareList ? " bg-[#fcb415]  text-white" : "bg-white hover:bg-slate-200 "}`}
                            >
                                <MdOutlineCompare className={"w-4 h-4"}/>

                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        {renderVariants()}
                    </div>
                    <div>
                        <h2 className="nc-ProductCard__title text-xs lg:text-base font-semibold transition-colors dark:text-white">
                            {data?.name}
                        </h2>
                    </div>

                    <div
                        className="flex flex-col gap-y-2 sm:flex-row justify-between items-start  text-xs sm:text-base ">
                        <div className="hidden sm:flex items-center mb-0.5 whitespace-nowrap">
                            <StarIcon className="w-5 h-5 pb-[1px] text-amber-400"/>
                            <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {data?.rating || ""} ({data?.comments.data.length || 0} نظر)
              </span>
                        </div>
                        {data && renderMinPrice(data)}

                        <div className="flex sm:hidden w-full">
                            {renderVariants()}
                        </div>

                    </div>


                    {renderMixDiscountTime() != null &&
                        <div className={"flex justify-end"}>
                            <SmallTimer date={renderMixDiscountTime() ?? ""}/>
                        </div>
                    }


                </div>

            </div>


        </>
    );
};

export default ProductCardWithCompare;
