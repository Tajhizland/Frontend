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


    const [variantActive, setVariantActive] = useState(0);
    const [showModalQuickView, setShowModalQuickView] = useState(false);
    const router = useRouter();

    const notifyAddTocart = ({size}: { size?: string }) => {
        toast.custom(
            (t) => (
                <Transition
                    as={"div"}
                    appear
                    show={t.visible}
                    className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200"
                    enter="transition-all duration-150"
                    enterFrom="opacity-0 translate-x-20"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-all duration-150"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-20"
                >
                    <p className="block text-base font-semibold leading-none">
                        Added to cart!
                    </p>
                    <div className="border-t border-slate-200 dark:border-slate-700 my-4"/>
                    {renderProductCartOnNotify({size})}
                </Transition>
            ),
            {
                position: "top-right",
                id: String(data?.id) || "product-detail",
                duration: 3000,
            }
        );
    };

    const renderProductCartOnNotify = ({size}: { size?: string }) => {
        return (
            <div className="flex ">
                <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        width={80}
                        height={96}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${data?.images.data[0].url}`}

                        alt={"Product Image"}
                        className="absolute object-cover object-center"
                    />
                </div>

                <div className="ms-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div>
                                <h3 className="text-base font-medium ">{data?.name}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>
                    {data?.colors ? data?.colors.data[variantActive].color_name : `بی رنگ`}
                  </span>
                                    <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
                                    <span>{size || "XL"}</span>
                                </p>
                            </div>
                            <Prices price={data?.min_price} className="mt-0.5"/>
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500 dark:text-slate-400">Qty 1</p>

                        <div className="flex">
                            <button
                                type="button"
                                className="font-medium text-primary-6000 dark:text-primary-500 "
                                onClick={(e) => {
                                    e.preventDefault();
                                    router.push("/cart");
                                }}
                            >
                                مشاهده سبد خرید
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderVariants = () => {

        return (
            <div className="flex gap-1.5">
                {data?.colors.data.map((color, index) => (
                    <div
                        key={index}
                        onClick={() => setVariantActive(index)}
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
        let status="";
        let discounted=0;
        data?.colors.data.map((item)=>{
            if (item.statusLabel!=""){
                status=item.statusLabel;
                if(item.discount>0)
                {
                    discounted=item.discount;
                }
            }
        })
        if (!status) {
            return null;
        }
        const CLASSES =
            " flex items-center text-slate-700 text-slate-900 dark:text-slate-300 absolute top-3 start-3 bg-white rounded-full p-2 text-xs";
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
                    <span className="mr-1 leading-none">{discounted}   تخفیف </span>
                </div>
            );
        }
        if (status === "disable") {
            return (
                <div className={CLASSES}>
                    <NoSymbolIcon className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none">نا‌موجود</span>
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


    return (
        <>
            <div
                className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
            >
                <Link href={{pathname: "/product/" + data?.url}} className="absolute inset-0"></Link>

                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                    <Link href={{pathname: "/product/" + data?.url}} className="block">
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                             src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${data?.images.data[0].url}`}

                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </Link>

                    <LikeButton liked={data?.favorite} likeHandle={likeHandle} className="absolute top-3 end-3 z-10"/>
                    {renderStatus()}
                    {/*{  renderGroupButtons()}*/}
                </div>

                <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                    {renderVariants()}
                    <div>
                        <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
                            {data?.name}
                        </h2>
                    </div>

                    <div className="flex justify-between items-end ">
                        <Prices price={data?.min_discounted_price}/>
                        <div className="flex items-center mb-0.5">
                            <StarIcon className="w-5 h-5 pb-[1px] text-amber-400"/>
                            <span className="text-sm ms-1 text-slate-500 dark:text-slate-400">
                {data?.rating || ""} ({data?.comments.data.length || 0} نظر)
              </span>
                        </div>
                    </div>
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
