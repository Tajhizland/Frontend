"use client"
import NcInputNumber from "@/components/NcInputNumber";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import BagIcon from "@/components/BagIcon";
import React, {useState} from "react";
import {ColorResponse} from "@/services/types/color";
import Prices from "@/components/Prices";
import {
    reduxAddToCart,
    reduxDecrementQuantity,
    reduxIncrementQuantity,
    reduxRemoveFromCart,
    useGlobalState
} from "@/services/globalState/GlobalState";
import {addToCart, decreaseCartItem, increaseCartItem, removeCartItem} from "@/services/api/shop/cart";

export default function ProductCartHandle({colors}: { colors: ColorResponse[] }) {
    const [selectedColor, setSelectedColor] = useState<ColorResponse>(colors[0])
    const [selectedCount, setSelectedCount] = useState<number>(0)
    const [cart] = useGlobalState('cart');

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
                            className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full border-2 cursor-pointer ${
                                color.id === selectedColor.id
                                    ? "border-primary-6000 dark:border-primary-500"
                                    : "border-transparent"
                            }`}
                        >
                            <div
                                className={`absolute inset-0.5 rounded-full overflow-hidden z-0 object-cover   bg-[${color.color_code}]`}

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
        await  addToCart({productColorId:selectedColor.id , count:selectedCount});
    }

    async function increaseHandle() {
        if(checkColorInCart()>0) {
            await increaseCartItem({productColorId: selectedColor.id});
            reduxIncrementQuantity(selectedColor.id)

        }
    }
    async function decreaseHandle() {
        if(checkColorInCart()>0) {
            await decreaseCartItem({productColorId: selectedColor.id});
            reduxDecrementQuantity(selectedColor.id)

        }
    }
    async function removeHandle() {
        if(checkColorInCart()>0) {
            await removeCartItem({productColorId: selectedColor.id});
            reduxRemoveFromCart(selectedColor.id)
        }

    }

    return (<>
        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        <div className="">{renderVariants()}</div>


        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}
        <div className="flex space-x-3.5">
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
            {checkColorInCart()==0 && <ButtonPrimary
                onClick={addToCartHandle}
                className="flex-1 flex-shrink-0"
            >
                <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5"/>
                <span className="mr-3">افزودن به سبد خرید</span>
            </ButtonPrimary>}
        </div>

        {/*  */}
    </>)
}
