//@ts-nocheck
"use client";
import React, {Fragment, useEffect, useMemo, useState} from "react";
import {GroupProductResponse} from "@/services/types/groupProduct";
import {ProductResponse} from "@/services/types/product";
import {toast} from "react-hot-toast";
import {addToCart, decreaseCartItem, increaseCartItem, removeCartItem} from "@/services/api/shop/cart";
import {
    reduxAddToCart,
    reduxDecrementQuantity,
    reduxIncrementQuantity,
    reduxRemoveFromCart, useGlobalState, useUser
} from "@/services/globalState/GlobalState";
import {ClockIcon, NoSymbolIcon, SparklesIcon} from "@heroicons/react/24/outline";
import Badge from "@/shared/Badge/Badge";
import {ColorResponse} from "@/services/types/color";
import {GuarantyResponse} from "@/services/types/guaranty";
import NotifyAddTocart from "@/components/Product/NotifyAddTocart";
import NcImage from "@/shared/NcImage/NcImage";
import Prices from "@/components/Price/Prices";
import {GuarantyPrice} from "@/hooks/GuarantyPrice";
import Link from "next/link";
import {Route} from "next";
import CartController from "@/components/CartController/CartController";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import BagIcon from "@/components/Icon/BagIcon";
import SmallTimer from "@/components/Timer/SmallTimer";
import {StarIcon} from "@heroicons/react/24/solid";

type Props = {
    groupItems: GroupProductResponse[];
    setProduct: (product: ProductResponse) => void
};

export default function ProductGroupFilter({groupItems, setProduct}: Props) {
    const [selectedValues, setSelectedValues] = useState<Record<string, string | null>>({});
    const [selectedColor, setSelectedColor] = useState<ColorResponse>(groupItems?.[0].product.colors.data?.[0])
    const [selectedGuaranty, setSelectedGuaranty] = useState<GuarantyResponse>()
    const [selectedCount, setSelectedCount] = useState<number>(1)
    const [cart, setCart] = useGlobalState('cart');
    const [user] = useUser();

    // گروه‌بندی titleها به همراه valueهای آن‌ها
    const groupedFields = useMemo(() => {
        const map = new Map<string, Set<string>>();
        groupItems.forEach((item) => {
            item.value?.data.forEach((val) => {
                const title = val.groupField?.title;
                const value = val.value;
                if (title && value) {
                    if (!map.has(title)) {
                        map.set(title, new Set());
                    }
                    map.get(title)?.add(value);
                }
            });
        });
        return map;
    }, [groupItems]);

    // فیلتر محصولات بر اساس selectedValues
    const product: ProductResponse | null = useMemo(() => {
        const matchedItem = groupItems.find((item) => {
            const itemValues = item.value?.data ?? [];
            return Object.entries(selectedValues).every(([title, selectedVal]) => {
                if (!selectedVal) return true;
                return itemValues.some(
                    (val) => val.groupField?.title === title && val.value === selectedVal
                );
            });
        });
        setProduct(matchedItem?.product ?? null);
        return matchedItem?.product ?? null;
    }, [groupItems, selectedValues]);

    useEffect(() => {
        setSelectedGuaranty(product?.guaranties.data[0])
        setSelectedColor(product?.colors.data[0])
    }, [product]);
    const handleSelectValue = (title: string, value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [title]: prev[title] === value ? null : value,
        }));
    };


    const checkColorInCart = () => {
        const item = cart && cart.find(item => item.color.id === selectedColor?.id && item.guaranty.id == selectedGuaranty?.id);
        return item ? item.count : 0;
    };

    const notifyAddTocart = (product: ProductResponse) => {
        toast.custom(
            (t: any) => (
                <NotifyAddTocart
                    name={product.name}
                    price={selectedColor?.price}
                    productImage={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product.images.data[0].url}`}

                    qualitySelected={selectedCount}
                    show={t.visible}
                    color={selectedColor?.color_name}
                />
            ),
            {position: "top-left", id: "nc-product-notify", duration: 3000}
        );
    };


    async function addToCartHandle(product: ProductResponse) {
        if (!user) {
            toast.error("برای ثبت سفارش ابتدا وارد شوید یا ثبت نام کنید .");
            return;
        }
        let response = await addToCart({
            productColorId: selectedColor.id,
            count: selectedCount,
            guaranty_id: selectedGuaranty?.id ?? undefined
        });
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
            let response = await increaseCartItem({
                productColorId: selectedColor.id,
                guaranty_id: selectedGuaranty?.id ?? undefined
            });
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
            let response = await decreaseCartItem({
                productColorId: selectedColor.id,
                guaranty_id: selectedGuaranty?.id ?? undefined
            });
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
            let response = await removeCartItem({
                productColorId: selectedColor.id,
                guaranty_id: selectedGuaranty?.id ?? undefined
            });
            if (response.success) {
                reduxRemoveFromCart(selectedColor.id, selectedGuaranty?.id)
            }
        }
    }

    const renderMaxDiscountTime = () => {
        let timer = null;
        const now = new Date();

        if (
            selectedColor.discount_expire_time &&
            selectedColor.discountedPrice != selectedColor.price
        ) {
            const expireDate = new Date(selectedColor.discount_expire_time);
            if (expireDate > now) {
                timer = selectedColor.discount_expire_time;
            }
        }
        return timer;
    };

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
                    <SparklesIcon className="w-3.5 h-3.5"/>
                    <span className="mr-1 leading-none">محصول جدید</span>
                </div>
            );
        }
        if (selectedColor.discount != 0 && selectedColor.discountedPrice != 0 && selectedColor.discountedPrice != selectedColor.price) {
            return (
                <div className={CLASSES}>

                    <Badge color={"red"} name={
                        <span className="mr-1 leading-none  text-red-500 text-xs">
                          {selectedColor.discount} % تخفیف
                         </span>
                    }/>
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
                    <span className="mr-1 leading-none">{status}</span>
                </div>
            );
        }
        return null;
    };
    const renderVariants = () => {
        const colors = product.colors.data;
        const guaranty = product.guaranties.data;
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
                            {selectedColor.discountedPrice ? renderMainPrice() :
                                <Badge name={"ناموجود"} color={"red"}/>}
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
                                : " "
                            }`}
                        >
                            <div
                                style={{backgroundColor: color.color_code}}
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
                    <Fragment key={index}>

                        <div onClick={() => {
                            setSelectedGuaranty(item)
                        }}
                             key={index}
                             className={`flex gap-20 items-center bg-slate-100/70  justify-between rounded-full border-2 p-1 pl-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-black/20 w-full ${selectedGuaranty == item ? "border-primary-6000 dark:border-primary-500" : ""}`}>
                            <div onClick={() => {
                                setSelectedGuaranty(item)
                            }}
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
                                <small
                                    className={`text-xs  max-w-xs flex-shrink-0 ${selectedGuaranty?.id == item.id ? "text-primary-6000" : "text-slate-600 dark:text-white"}`}>
                                    {item.name}
                                </small>

                            </div>
                            <span className={"text-xs text-slate-600 dark:text-white"}>
                            {
                                item.free ? "رایگان"
                                    :
                                    <Prices className=" whitespace-nowrap" price={GuarantyPrice(selectedColor.price)}/>
                            }

                        </span>
                        </div>
                        {item.id == selectedGuaranty?.id && selectedGuaranty && selectedGuaranty?.description && selectedGuaranty?.description != "null" &&
                            <div
                                className={"text-xs text-primary-6000  flex-shrink-0 rounded-2xl p-2 max-w-sm "}>
                                <div dangerouslySetInnerHTML={{__html: (selectedGuaranty?.description)}}/>
                            </div>}
                    </Fragment>
                ))}


            </div>
        }
        return null;
    };
    const renderMainPrice = () => {
        if (selectedColor.discountedPrice == selectedColor.price) {
            return <Prices price={selectedColor.price}/>
        }
        return <div className={"flex items-center gap-2"}>
            <del className={"text-sm text-red-500"}>
                {
                    new Intl.NumberFormat('fa').format(selectedColor.price)
                }
            </del>
            <Prices price={selectedColor.discountedPrice}/>
        </div>
    }

    const renderBrand = () => {
        if (product?.brand) {
            return <div className={"flex items-center justify-start w-full"}>

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
                    برند
                    {" "}
                    {
                        product?.brand.name
                    }
                </span>
            </div>
        }
        return null;
    };
    return (
        <div className="space-y-6 p-4">
            {[...groupedFields.entries()].map(([title, values]) => (
                <div key={title}>
                    <h4 className="font-bold mb-2">{title}</h4>
                    <div className="flex flex-wrap gap-2">
                        {[...values].map((value) => {
                            const isSelected = selectedValues[title] === value;
                            return (
                                <button
                                    key={value}
                                    className={`px-3 py-1 border rounded-full text-sm transition ${
                                        isSelected
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                    onClick={() => handleSelectValue(title, value)}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* نمایش محصولات فیلتر شده */}
            <div>
                {!product ? (
                    <p className="text-gray-500 mt-2">محصولی یافت نشد.</p>
                ) : (
                    <ul className=" pl-5 mt-2">
                        <li key={product.id} className={" "}>
                            <div className={"flex flex-col gap-5"}>
                                <span>{product.name} </span>

                                <div className="flex items-center justify-between   gap-x-5">
                                    <div className="flex text-2xl font-semibold">
                                        {renderStatus()}
                                        <div className={"flex justify-start mr-5"}>
                                            {renderMaxDiscountTime() != null &&
                                                <SmallTimer date={renderMaxDiscountTime() ?? ""}/>
                                            }
                                        </div>
                                    </div>

                                    <a
                                        href="#reviews"
                                        className="flex items-center text-sm font-medium"
                                    >
                                        <div className="">
                                            <StarIcon className="w-5 h-5 pb-[1px] text-orange-400"/>
                                        </div>
                                        <span className="mr-1.5 flex">
                                <span>{product.rating} </span>
                                <span className="text-slate-700 dark:text-slate-400 underline">
                                    {product.comments.data.length} نظر
                                </span>
                            </span>
                                    </a>
                                </div>
                                <div className="mt-6 gap-y-3 lg:gap-y-7">
                                    <div className="">{renderVariants()}</div>

                                    <div className="flex justify-between items-center">
                                        {/*{renderDelay()}*/}
                                    </div>
                                    <div className="flex  items-center max-h-24 my-5">
                                        {renderBrand()}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {renderGuaranty()}
                                    </div>
                                    {/*<div className="">{renderSizeList()}</div>*/}
                                </div>
                                {selectedColor.statusLabel != "disable" ? <div className="flex  gap-x-3.5">
                                    <div
                                        className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-800/70 px-2 py-3 sm:p-3.5 rounded-full dark:text-white">

                                        <CartController
                                            inCart={checkColorInCart() > 0 ? true : false}
                                            defaultValue={checkColorInCart() != 0 ? checkColorInCart() : 1}
                                            onChange={setSelectedCount}
                                            max={selectedColor.stock}
                                            removeHandle={removeHandle}
                                            decreaseHandel={decreaseHandle}
                                            increaseHandle={increaseHandle}
                                        />
                                    </div>
                                    {checkColorInCart() == 0 && selectedCount > 0 && <ButtonPrimary
                                        onClick={addToCartHandle}
                                        className="flex-1 flex-shrink-0"
                                    >
                                        <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5"/>
                                        <span className="mr-3">افزودن به سبد خرید</span>
                                    </ButtonPrimary>
                                    }
                                </div> : ""}
                            </div>
                        </li>
                    </ul>
                )}
            </div>
        </div>
    );
}
