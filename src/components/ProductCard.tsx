"use client";

import React, {FC, useState} from "react";
import LikeButton from "./LikeButton";
import Prices from "./Prices";
import {ArrowsPointingOutIcon} from "@heroicons/react/24/outline";
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
import {useQueryClient} from "react-query";
import {Route} from "next";

export interface ProductCardProps {
    className?: string;
    data?: ProductResponse;
}

const ProductCard: FC<ProductCardProps> = ({
                                               className = "",
                                               data,
                                           }) => {


    const [variantActive, setVariantActive] = useState(0);
    const [showModalQuickView, setShowModalQuickView] = useState(false);
    const router = useRouter();
    const queryClient = useQueryClient(); // درست است
    async function likeHandle(like: boolean) {
        if (like) {
          let response =  await addToFavorite({productId: data?.id as number})
            toast.success(response?.message as string)
        } else {
            let response =  await deleteFromFavorite({productId: data?.id as number})
            toast.success(response?.message as string)

        }
        queryClient.invalidateQueries(['get_favorite' ]);
    }

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
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${data?.images?.data[0].url}`}

                        alt={data?.name as string}
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
                    {/* {variants ? variants[variantActive].name : `Natural`} */}
                  </span>
                                    <span className="mx-2 border-s border-slate-200 dark:border-slate-700 h-4"></span>
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
                                View cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const getBorderClass = (Bgclass = "") => {
        if (Bgclass.includes("red")) {
            return "border-red-500";
        }
        if (Bgclass.includes("violet")) {
            return "border-violet-500";
        }
        if (Bgclass.includes("orange")) {
            return "border-orange-500";
        }
        if (Bgclass.includes("green")) {
            return "border-green-500";
        }
        if (Bgclass.includes("blue")) {
            return "border-blue-500";
        }
        if (Bgclass.includes("sky")) {
            return "border-sky-500";
        }
        if (Bgclass.includes("yellow")) {
            return "border-yellow-500";
        }
        return "border-transparent";
    };

    const renderVariants = () => {

        return (
            <div className="flex gap-1.5">
                {data && data.colors && data?.colors.data.map((color, index) => (
                    <div
                        key={index}
                        onClick={() => setVariantActive(index)}
                        className={`relative w-6 h-6 rounded-full overflow-hidden z-10 border cursor-pointer ${variantActive == index ? "shadow-lg" : ""}`}
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

    const renderGroupButtons = () => {
        return (
            <div
                className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ButtonPrimary
                    className="shadow-lg"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                    onClick={() => notifyAddTocart({size: "XL"})}
                >
                    <BagIcon className="w-3.5 h-3.5 mb-0.5"/>
                    <span className="ms-1">Add to bag</span>
                </ButtonPrimary>
                <ButtonSecondary
                    className="ms-1.5 bg-white hover:!bg-gray-100 hover:text-slate-900 transition-colors shadow-lg"
                    fontSize="text-xs"
                    sizeClass="py-2 px-4"
                    onClick={() => setShowModalQuickView(true)}
                >
                    <ArrowsPointingOutIcon className="w-3.5 h-3.5"/>
                    <span className="ms-1">Quick view</span>
                </ButtonSecondary>
            </div>
        );
    };


    return (
        <>
            <div
                className={`nc-ProductCard relative flex flex-col bg-transparent ${className}`}
            >
                <Link href={"/product/"+data?.url as Route} className="absolute inset-0"></Link>

                <div
                    className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group">
                    <Link href={"/product/"+data?.url as Route} className="block">
                        <NcImage
                            containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                             src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${data?.images?.data[0].url}`}

                            className="object-cover w-full h-full drop-shadow-xl"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </Link>
                    <LikeButton likeHandle={likeHandle} liked={data?.favorite} className="absolute top-3 end-3 z-10"/>
                </div>

                <div className="space-y-4 px-2.5 pt-5 pb-2.5">
                    {renderVariants()}
                    <div>
                        <h2 className="nc-ProductCard__title text-base font-semibold transition-colors">
                            {data?.name}
                        </h2>
                    </div>

                    <div className="flex justify-between items-end ">
                        <Prices price={data?.min_price}/>
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

export default ProductCard;
