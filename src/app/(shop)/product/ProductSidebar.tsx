"use client"
import Prices from "@/components/Prices";
import React, { useState } from "react";
import { ColorResponse } from "@/services/types/color";
import {
    getGlobalState,
    reduxAddToCart,
    reduxDecrementQuantity,
    reduxIncrementQuantity,
    reduxRemoveFromCart,
    useGlobalState, useUser
} from "@/services/globalState/GlobalState";
import BagIcon from "@/components/BagIcon";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { addToCart, decreaseCartItem, increaseCartItem, removeCartItem } from "@/services/api/shop/cart";
import { StarIcon } from "@heroicons/react/24/solid";
import NcInputNumber from "@/components/NcInputNumber";
import { toast } from "react-hot-toast";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import { ProductResponse } from "@/services/types/product";
import { useQueryClient } from "react-query";
import { ClockIcon, NoSymbolIcon, SparklesIcon } from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import NcImage from "@/shared/NcImage/NcImage";
import Link from "next/link";
import { Route } from "next";
import Policy from "../product-detail/Policy";
import { GuarantyResponse } from "@/services/types/guaranty";
import Badge from "@/shared/Badge/Badge";

export default function ProductSidebar({ product }: { product: ProductResponse }) {
    const colors = product.colors.data;
    const guaranty = product.guaranties.data;
    const [selectedColor, setSelectedColor] = useState<ColorResponse>(colors[0])
    const [selectedGuaranty, setSelectedGuaranty] = useState<GuarantyResponse>(guaranty[0] ?? null)
    const [selectedCount, setSelectedCount] = useState<number>(0)
    const [cart, setCart] = useGlobalState('cart');
    const queryClient = useQueryClient(); // درست است
    const [user] = useUser();


    const notifyAddTocart = () => {
        toast.custom(
            (t) => (
                <NotifyAddTocart
                    name={product.name}
                    price={selectedColor.price}
                    productImage={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product.images.data[0].url}`}

                    qualitySelected={selectedCount}
                    show={t.visible}
                    color={selectedColor.color_name}
                />
            ),
            { position: "top-left", id: "nc-product-notify", duration: 3000 }
        );
    };
    const renderVariants = () => {
        if (!colors || !colors.length) {
            return null;
        }


        return (
            <div>
                <label htmlFor="">
                    <div className={"flex justify-between items-center"}>
                        <span className="text-sm font-medium dark:text-white">
                            رنگ :
                            <span className="ml-1 font-semibold">
                                {selectedColor.color_name}
                            </span>
                        </span>
                        <div className={"flex mt-3"}>
                            {selectedColor.discountedPrice ? <Prices
                                contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold text-center"
                                price={selectedColor.discountedPrice}
                            /> :
                                <Badge name={"ناموجود"} color={"red"} />}
                        </div>
                    </div>
                </label>
                <div className="flex mt-3">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedColor(color)}
                            className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${color.id === selectedColor.id
                                ? "border-primary-6000 dark:border-primary-500"
                                : "border-transparent"
                                }`}
                        >
                            <div
                                style={{ backgroundColor: color.color_code }}
                                className={`absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover `}

                            ></div>
                        </div>
                    ))}
                </div>

            </div>
        );
    };
    const renderGuaranty = () => {
        if (product?.guaranties) {
            return <div className={"flex flex-col gap-1 w-full"}>
                {product?.guaranties.data.map((item, index) => (
                    <div onClick={() => { setSelectedGuaranty(item) }}
                        key={index} className={`flex gap-20 items-center bg-slate-100/70  justify-between rounded-full border p-1 pl-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-black/20 ${selectedGuaranty == item ? "border-slate-800" : ""}`}>
                        <div onClick={() => { setSelectedGuaranty(item) }}
                            key={index} className={`flex gap-5 items-center  `}>
                            <div
                                className={"w-10 flex-shrink-0"}
                            ><NcImage
                                    containerClassName="flex aspect-w-11 aspect-h-12 w-full h-0"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/guaranty/${item?.icon}`}
                                    className="object-cover w-full h-full drop-shadow-xl"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                    alt="guaranty"
                                /></div>
                            <small className={"text-xs text-slate-600 dark:text-white max-w-xs flex-shrink-0"}>
                            {item.name} 
                            </small>
                        </div>
                        <span className={"text-xs text-slate-600 dark:text-white"}>
                            رایگان
                        </span>
                    </div>))}
            </div>
        }
        return null;
    };
    const renderBrand = () => {
        if (product?.brand) {
            return <div className={"flex items-center justify-between w-full"}>

                <Link href={"/brand/" + product.brand.url as Route}
                    className={`relative h-0 w-32 rounded-2xl overflow-hidden group aspect-w-3 aspect-h-1 `}
                >
                    <div className="flex justify-center items-center">
                        <NcImage
                            alt=""
                            containerClassName="w-full h-fit flex justify-center"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${product.brand.image}`}
                            className="object-contain rounded-2xl w-full h-full"
                            width={720}
                            height={720}
                        />
                    </div>
                </Link>
                <span>
                    {
                        product?.brand.name
                    }
                </span>
            </div>
        }
        return null;
    };
    const renderDelay = () => {
        if (selectedColor.delivery_delay > 0) {
            return <div className={"text-neutral-500 text-xs font-bold"}>
                <span>زمان اماده سازی : </span>
                <span>{selectedColor.delivery_delay}</span>
                <span>روز</span>
            </div>
        }
    };

    const checkColorInCart = () => {
        const item = cart && cart.find(item => item.color.id === selectedColor.id && item.guaranty.id == selectedGuaranty.id);
        return item ? item.count : 0;
    };

    async function addToCartHandle() {
        if (!user) {
            toast.error("برای ثبت سفارش ابتدا وارد شوید یا ثبت نام کنید .");
            return;
        }
        let response = await addToCart({ productColorId: selectedColor.id, count: selectedCount, guaranty_id: selectedGuaranty?.id ?? undefined });
        if (response.success) {
            reduxAddToCart(product, selectedCount, selectedColor, selectedGuaranty);
            notifyAddTocart();
        }
    }

    async function increaseHandle() {
        if (!user) {
            toast.error("برای ثبت سفارش ابتدا وارد شوید یا ثبت نام کنید .");
            return;
        }
        if (checkColorInCart() > 0) {
            let response = await increaseCartItem({ productColorId: selectedColor.id, guaranty_id: selectedGuaranty.id ?? undefined });
            if (response.success) {
                reduxIncrementQuantity(selectedColor.id, selectedGuaranty?.id)
            }
        }
    }

    async function decreaseHandle() {
        if (!user) {
            toast.error("برای ثبت سفارش ابتدا وارد شوید یا ثبت نام کنید .");
            return;
        }
        if (checkColorInCart() > 0) {
            let response = await decreaseCartItem({ productColorId: selectedColor.id, guaranty_id: selectedGuaranty.id ?? undefined });
            if (response.success) {
                reduxDecrementQuantity(selectedColor.id, selectedGuaranty?.id)
            }

        }
    }

    async function removeHandle() {
        if (!user) {
            toast.error("برای ثبت سفارش ابتدا وارد شوید یا ثبت نام کنید .");
            return;
        }
        if (checkColorInCart() > 0) {
            let response = await removeCartItem({ productColorId: selectedColor.id, guaranty_id: selectedGuaranty.id ?? undefined });
            if (response.success) {
                reduxRemoveFromCart(selectedColor.id, selectedGuaranty?.id)
            }
        }
    }

    const renderStatus = () => {

        let status = selectedColor.statusLabel;
        if (!status) {
            return null;
        }
        const CLASSES =
            "text-sm flex items-center text-slate-700 text-slate-900 dark:text-slate-300";
        if (status == "new") {
            return (
                <div className={CLASSES}>
                    <SparklesIcon className="w-3.5 h-3.5" />
                    <span className="mr-1 leading-none">محصول جدید</span>
                </div>
            );
        }
        if (status == "discount") {
            return (
                <div className={CLASSES}>
                    <IconDiscount className="w-3.5 h-3.5" />
                    <span className="mr-1 leading-none">{selectedColor.discount} % تخفیف </span>
                </div>
            );
        }
        if (status === "disable") {
            return (
                <div className={CLASSES}>
                    <NoSymbolIcon className="w-3.5 h-3.5" />
                    <span className="mr-1 leading-none">نا‌موجود</span>
                </div>
            );
        }
        if (status === "limited edition") {
            return (
                <div className={CLASSES}>
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span className="mr-1 leading-none">{status}</span>
                </div>
            );
        }
        return null;
    };

    return (<>
        <div className="listingSectionSidebar__wrap lg:shadow-lg">
            <div className="space-y-7 lg:space-y-8">
                {/* PRICE */}
                <div className="">
                    {/* ---------- 1 HEADING ----------  */}
                    <div className="flex items-center justify-between   gap-x-5">
                        <div className="flex text-2xl font-semibold">
                            {renderStatus()}
                        </div>

                        <a
                            href="#reviews"
                            className="flex items-center text-sm font-medium"
                        >
                            <div className="">
                                <StarIcon className="w-5 h-5 pb-[1px] text-orange-400" />
                            </div>
                            <span className="mr-1.5 flex">
                                <span>{product.rating} </span>
                                <span className="text-slate-700 dark:text-slate-400 underline">
                                    {product.comments.data.length} نظر
                                </span>
                            </span>
                        </a>
                    </div>

                    {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
                    <div className="mt-6 space-y-7 lg:space-y-8">
                        <div className="">{renderVariants()}</div>

                        <div className="flex justify-between items-center">
                            {renderDelay()}
                        </div>
                        <div className="flex  items-center max-h-24">
                            {renderBrand()}
                        </div>
                        <div className="flex justify-between items-center">
                            {renderGuaranty()}
                        </div>
                        {/*<div className="">{renderSizeList()}</div>*/}
                    </div>
                </div>
                {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
                {selectedColor.statusLabel != "disable" ? <div className="flex  gap-x-3.5">
                    <div
                        className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full dark:text-white">
                        <NcInputNumber
                            defaultValue={checkColorInCart()}
                            onChange={setSelectedCount}
                            max={selectedColor.stock}
                            removeHandle={removeHandle}
                            decreaseHandel={decreaseHandle}
                            increaseHandle={increaseHandle}
                        />
                    </div>
                    {checkColorInCart() == 0 && <ButtonPrimary
                        onClick={addToCartHandle}
                        className="flex-1 flex-shrink-0"
                    >
                        <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                        <span className="mr-3">افزودن به سبد خرید</span>
                    </ButtonPrimary>
                    }
                </div> : ""}
                <div className="hidden lg:flex">
                    <Policy />
                </div>

                {/* SUM */}
            </div>
        </div>
    </>)
}
