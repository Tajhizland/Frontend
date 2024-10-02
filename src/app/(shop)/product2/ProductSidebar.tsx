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
    useGlobalState
} from "@/services/globalState/GlobalState";
import BagIcon from "@/components/BagIcon";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { addToCart, decreaseCartItem, increaseCartItem, removeCartItem } from "@/services/api/shop/cart";
import { StarIcon } from "@heroicons/react/24/solid";
import NcInputNumber from "@/components/NcInputNumber";
import { toast } from "react-hot-toast";
import NotifyAddTocart from "@/components/NotifyAddTocart";
import { ProductResponse } from "@/services/types/product";

export default function ProductSidebar({  product }: { product:ProductResponse }) {
    const colors=product.colors.data;
    const [selectedColor, setSelectedColor] = useState<ColorResponse>(colors[0])
    const [selectedCount, setSelectedCount] = useState<number>(0)
    const [cart, setCart] = useGlobalState('cart');

    const notifyAddTocart = () => {
        toast.custom(
            (t) => (
                <NotifyAddTocart
                    name={product.name}
                    price={selectedColor.price}
                    productImage={product.images.data[0].url}
                    qualitySelected={selectedCount}
                    show={t.visible}
                    color={selectedColor.color_name}
                />
            ),
            { position: "top-right", id: "nc-product-notify", duration: 3000 }
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
                        <span className="text-sm font-medium">
                            رنگ :
                            <span className="ml-1 font-semibold">
                                {selectedColor.color_name}
                            </span>
                        </span>
                        <div className={"flex mt-3"}>
                            <Prices
                                contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold text-center"
                                price={selectedColor.price}
                            />
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

    const checkColorInCart = () => {
        const item = cart.find(item => item.color.id === selectedColor.id);
        return item ? item.count : 0;
    };
    async function addToCartHandle() {
        await addToCart({ productColorId: selectedColor.id, count: selectedCount });
        reduxAddToCart(product , selectedCount ,selectedColor);
         notifyAddTocart();
     }

    async function increaseHandle() {
        if (checkColorInCart() > 0) {
            await increaseCartItem({ productColorId: selectedColor.id });
            reduxIncrementQuantity(selectedColor.id)

        }
    }
    async function decreaseHandle() {
        if (checkColorInCart() > 0) {
            await decreaseCartItem({ productColorId: selectedColor.id });
            reduxDecrementQuantity(selectedColor.id)

        }
    }
    async function removeHandle() {
        if (checkColorInCart() > 0) {
            await removeCartItem({ productColorId: selectedColor.id });
            reduxRemoveFromCart(selectedColor.id)
        }

    }

    return (<>
        <div className="listingSectionSidebar__wrap lg:shadow-lg">
            <div className="space-y-7 lg:space-y-8">
                {/* PRICE */}
                <div className="">
                    {/* ---------- 1 HEADING ----------  */}
                    <div className="flex items-center justify-between   gap-x-5">
                        <div className="flex text-2xl font-semibold">
                            {selectedColor.price}
                        </div>

                        <a
                            href="#reviews"
                            className="flex items-center text-sm font-medium"
                        >
                            <div className="">
                                <StarIcon className="w-5 h-5 pb-[1px] text-orange-400" />
                            </div>
                            <span className="mr-1.5 flex">
                                <span>4.9 </span>
                                <span className="mx-1.5">·</span>
                                <span className="text-slate-700 dark:text-slate-400 underline">
                                    142 reviews
                                </span>
                            </span>
                        </a>
                    </div>

                    {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
                    <div className="mt-6 space-y-7 lg:space-y-8">
                        <div className="">{renderVariants()}</div>
                        {/*<div className="">{renderSizeList()}</div>*/}
                    </div>
                </div>
                {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
                <div className="flex  gap-x-3.5">
                    <div
                        className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full">
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
                </div>

                {/* SUM */}
            </div>
        </div>
    </>)
}
