"use client";

import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@/app/(shop)/headlessui";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import { getCart, removeCartItem } from "@/services/api/shop/cart";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { CartResponse } from "@/services/types/cart";
import { reduxRemoveFromCart, setCart, useCart, useGlobalState, useUser } from "@/services/globalState/GlobalState";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { Route } from "next";
import { GuarantyPrice } from "@/hooks/GuarantyPrice";

export default function CartDropdown() {

    const [cart] = useCart();
    const [user] = useUser();

    const { data, isSuccess } = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart(),
        staleTime: 5000,
        enabled: !!user,
        onSuccess: (cartData) => {
            setCart(cartData);
        }
    });


    async function removeFromCart(id: number, guarantyId: number | undefined) {
        let response = await removeCartItem({ productColorId: id, guaranty_id: guarantyId });
        reduxRemoveFromCart(id, guarantyId);
        toast.success(response.message as string)
    }

    const renderProduct = (item: CartResponse, index: number, close: () => void) => {
        const { product, count, color } = item;
        const { name, url, image } = product;
        const { title, code, price, id } = color;
        return (
            <div key={index} className="flex py-5 last:pb-0">
                <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        fill
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.product.image}`}
                        alt={name}
                        className="h-full w-full object-contain object-center"
                    />
                    <Link
                        onClick={close}
                        className="absolute inset-0"
                        href={"/product/" + item.product.url as Route}
                    />
                </div>

                <div className="mr-4 flex flex-1 flex-col">
                    <div>
                        <div className="flex  flex-col ">
                            <div>
                                <h3 className="text-xs font-medium ">
                                    <Link onClick={close} href={"/product/" + item.product.url as Route}>
                                        {name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    <span>{title}</span>
                                </p>
                                <div className="flex items-center gap-x-1">
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {item.guaranty.name}
                                    </span>
                                    {
                                        item.guaranty.free ?
                                            <span className="text-xs text-slate-500 dark:text-slate-400">
                                                (رایگان)
                                            </span>
                                            :
                                            <Prices priceClass="text-xs text-slate-500 dark:text-slate-400" price={GuarantyPrice(item.color.price)} />
                                    }

                                </div>
                            </div>
                            <Prices price={price} className="whitespace-nowrap" />
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-xs">
                        <p className="text-gray-500 dark:text-slate-400">{`تعداد : ${count}`}</p>

                        <div className="flex">
                            <button
                                type="button"
                                className="font-medium text-primary-6000 dark:text-primary-500 "
                                onClick={() => {
                                    removeFromCart(id as number, item.guaranty.id as number)
                                }}
                            >
                                حذف
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        );
    };

    const renderSumPrice = () => {
        let sumPrice = 0;
        cart && cart.map((item) => {
            sumPrice += item.color.price;
        })
        return sumPrice;
    }
    return (
        <Popover className="relative z-50 hidden lg:block">
            {({ open, close }) => (
                <>
                    <PopoverButton
                        className={`
                ${open ? "" : "text-opacity-90"}
                 group w-10 h-10 sm:w-12 sm:h-12 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full inline-flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative`}
                    >
                        <div
                            className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-1.5 right-1.5 rounded-full text-[10px] leading-none text-white font-medium">
                            <span className="mt-[1px]">
                                {cart?.length ?? 0}
                            </span>
                        </div>
                        <svg
                            className="w-6 h-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 2H3.74001C4.82001 2 5.67 2.93 5.58 4L4.75 13.96C4.61 15.59 5.89999 16.99 7.53999 16.99H18.19C19.63 16.99 20.89 15.81 21 14.38L21.54 6.88C21.66 5.22 20.4 3.87 18.73 3.87H5.82001"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M16.25 22C16.9404 22 17.5 21.4404 17.5 20.75C17.5 20.0596 16.9404 19.5 16.25 19.5C15.5596 19.5 15 20.0596 15 20.75C15 21.4404 15.5596 22 16.25 22Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.25 22C8.94036 22 9.5 21.4404 9.5 20.75C9.5 20.0596 8.94036 19.5 8.25 19.5C7.55964 19.5 7 20.0596 7 20.75C7 21.4404 7.55964 22 8.25 22Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 8H21"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <Link className="block md:hidden absolute inset-0" href={"/cart"} />
                    </PopoverButton>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel
                            className="hidden md:block absolute z-10 w-screen max-w-sm sm:max-w-lg px-4 mt-3.5 -left-28 sm:left-0 sm:px-0">
                            <div
                                className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                                <div className="relative bg-white dark:bg-neutral-800">
                                    <div className="max-h-[60vh] p-5 overflow-y-auto hiddenScrollbar">
                                        <h3 className="text-xl font-semibold">
                                            سبد خرید
                                        </h3>
                                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                                            {cart && cart.map(
                                                (item, index) => renderProduct(item, index, close)
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-neutral-50 dark:bg-slate-900 p-5">
                                        <p className="flex justify-between font-semibold text-slate-900 dark:text-slate-100">
                                            <span>قیمت کل</span>
                                            <span className={`text-slate-900 !leading-none `}>{new Intl.NumberFormat('en-US').format(renderSumPrice())} تومان </span>
                                        </p>
                                        <div className="flex gap-x-2 mt-5">
                                            <ButtonSecondary
                                                href="/cart"
                                                className="flex-1 border border-slate-200 dark:border-slate-700"
                                                onClick={close}
                                            >
                                                مشاهده سبد خرید
                                            </ButtonSecondary>
                                            <ButtonPrimary
                                                href="/checkout"
                                                onClick={close}
                                                className="flex-1"
                                            >
                                                پرداخت
                                            </ButtonPrimary>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
