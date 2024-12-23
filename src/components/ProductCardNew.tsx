"use client";

import React, {FC, useState} from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import {ArrowsPointingOutIcon, ClockIcon, NoSymbolIcon, SparklesIcon} from "@heroicons/react/24/outline";
import {Product, PRODUCTS} from "@/data/data";
import {StarIcon} from "@heroicons/react/24/solid";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import BagIcon from "./BagIcon";
import toast from "react-hot-toast";
import {Transition} from "@/app/(shop)/headlessui";
import ModalQuickView from "./ModalQuickView";
import ProductStatus from "./ProductStatus";
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";
import {ProductResponse} from "@/services/types/product";
import {addToFavorite, deleteFromFavorite} from "@/services/api/shop/favorite";
import IconDiscount from "@/components/IconDiscount";
import Badge from "@/shared/Badge/Badge";

export interface ProductCardProps {
    className?: string;
    data?: ProductResponse;
    isLiked?: boolean;
}

const ProductCard2: FC<ProductCardProps> = ({
                                                className = "",
                                                data,
                                                isLiked,
                                            }) => {


    const [showModalQuickView, setShowModalQuickView] = useState(false);


    const renderVariants = () => {
        return (
            <div className="flex gap-1.5">
                {data?.colors.data.map((color, index) => (
                    <div
                        key={index}
                        className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer`}
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
            " flex items-center text-slate-700 text-slate-900 dark:text-slate-300 absolute top-3 start-3 bg-white rounded-full p-1 lg:p-2 text-xs";
        if (status == "new") {
            return (
                <div className={CLASSES}>
                    <SparklesIcon className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none text-xs">محصول جدید</span>
                </div>
            );
        }
        if (status == "discount") {
            return (
                <div className={CLASSES}>
                    <IconDiscount className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none text-xs">{discounted} تخفیف </span>
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

    return (
        <>
            <div
                className={`nc-ProductCard relative flex flex-row items-center sm:flex-col bg-transparent ${className}`}
            >
                <Link href={{pathname: "/product/" + data?.url}} className="absolute inset-0"></Link>

                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded sm:rounded-3xl overflow-hidden z-1 group w-28 sm:w-full">
                    <Link href={{pathname: "/product/" + data?.url}} className="block">
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${data?.images?.data[0]?.url}`}

                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </Link>

                    <LikeButton liked={data?.favorite} likeHandle={likeHandle}
                                className="absolute top-3 end-3 z-10 hidden sm:flex"/>
                    <div className={" "}>
                        {renderStatus()}
                    </div>
                    {/*{  renderGroupButtons()}*/}
                </div>

                <div className="space-y-4 px-2.5 sm:pt-5 sm:pb-2.5  w-full">

                    <LikeButton liked={data?.favorite} likeHandle={likeHandle}
                                className="absolute top-3 end-3 z-10 sm:hidden flex"/>

                    <div>
                        <h2 className="nc-ProductCard__title text-xs lg:text-base font-semibold transition-colors dark:text-white">
                            {data?.name}
                        </h2>
                    </div>

                    <div className="flex justify-between items-end">
                        {data && data.min_discounted_price>0?<Prices price={data?.min_discounted_price}/>:<Badge color={"red"} name={"ناموجود"} />}
                        <div className="hidden lg:flex items-center mb-0.5 ">
                            <StarIcon className="w-5 h-5 pb-[1px] text-amber-400"/>
                            <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                                {data?.rating || ""} ({data?.comments.data.length || 0} نظر)
                            </span>
                        </div>
                    </div>
                    {renderVariants()}
                </div>
            </div>

            {/* QUICKVIEW */}
            <ModalQuickView
                show={showModalQuickView}
                onCloseModalQuickView={() => setShowModalQuickView(false)}
            />
        </>
    );
};

export default ProductCard2;
