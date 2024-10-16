"use client"
import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import { Product, PRODUCTS } from "@/data/data";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "react-query";
import { decreaseCartItem, getCart, increaseCartItem, removeCartItem } from "@/services/api/shop/cart";
import { CartResponse } from "@/services/types/cart";
import { useGlobalState } from "@/services/globalState/CartGlobalState";
import {
    reduxDecrementQuantity,
    reduxIncrementQuantity,
    reduxRemoveFromCart,
    setCart,
    useCart,
    useUser
} from "@/services/globalState/GlobalState";
import { useMemo } from "react";

const CartPage = () => {
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


    async function increaseHandle(selectedColorId: number) {
        let response = await increaseCartItem({ productColorId: selectedColorId });
        if (response.success) {
            reduxIncrementQuantity(selectedColorId)
        }
    }

    async function decreaseHandle(selectedColorId: number) {
        let response = await decreaseCartItem({ productColorId: selectedColorId });
        if (response.success) {
            reduxDecrementQuantity(selectedColorId)
        }

    }

    async function removeHandle(selectedColorId: number) {
        let response = await removeCartItem({ productColorId: selectedColorId });
        if (response.success) {
            reduxRemoveFromCart(selectedColorId)
        }
    }

    const renderStatusSoldout = () => {
        return (
            <div
                className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <NoSymbolIcon className="w-3.5 h-3.5" />
                <span className="mr-1 leading-none">ناموجود</span>
            </div>
        );
    };

    const renderStatusInstock = () => {
        return (
            <div
                className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <CheckIcon className="w-3.5 h-3.5" />
                <span className="mr-1 leading-none">  موجود</span>
            </div>
        );
    };

    const renderProduct = (item: CartResponse, index: number) => {

        return (
            <div
                key={index}
                className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
            >
                <div className="relative h-36 w-24 sm:w-32 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        fill
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.product.image}`}
                        alt={item.product.name}
                        sizes="300px"
                        className="h-full w-full object-contain object-center"
                    />
                    <Link href={{ pathname: "/product/" + item.product.url }} className="absolute inset-0"></Link>
                </div>

                <div className="mr-3 sm:ml-6 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div className="flex-[1.5] ">
                                <h3 className="text-base font-semibold">
                                    <Link href={{ pathname: "/product/" + item.product.url }}>{item.product.name}</Link>
                                </h3>
                                <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600 dark:text-slate-300">
                                    <div className="flex items-center gap-x-1.5">
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M8.35 1.94995L9.69 3.28992"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M2.07 11.92L17.19 11.26"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M3 22H16"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeMiterlimit="10"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <span>{item.color.title}</span>
                                    </div>
                                    <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>

                                </div>

                             </div>

                            <div className=" block text-center relative">
                                <NcInputNumber className="relative z-10"
                                    defaultValue={item.count}
                                    increaseHandle={() => {
                                        increaseHandle(item.color.id as number)
                                    }}
                                    decreaseHandel={() => {
                                        decreaseHandle(item.color.id as number)
                                    }}
                                    removeHandle={() => {
                                        removeHandle(item.color.id as number)
                                    }}

                                />
                            </div>

                            <div className="hidden flex-1 sm:flex justify-end">
                                <Prices price={item.color.price * item.count} className="mt-0.5" />
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                        {!item.hasStock
                            ? renderStatusSoldout()
                            : renderStatusInstock()}

                        {/*<a*/}
                        {/*    href="##"*/}
                        {/*    className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "*/}
                        {/*>*/}
                        {/*    <span>حذف</span>*/}
                        {/*</a>*/}
                    </div>
                </div>
            </div>
        );
    };

    const renderSumPrice = () => {
        let sumPrice: number = 0;
        cart.map((item) => {
            sumPrice += Number(item.color.price * item.count);
        })
        return sumPrice;
    }

    const sumPrice = useMemo(() => renderSumPrice(), [cart]);
    return (
        <div className="nc-CartPage">
            <main className="container py-16 lg:pb-28 lg:pt-20 ">
                <div className="mb-12 sm:mb-16">
                    <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
                        سبد حرید
                    </h2>
                    <div
                        className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
                        <Link href={"/"} className="">
                            صفحه اصلی
                        </Link>
                        <span className="text-xs mx-1 sm:mx-1.5">/</span>
                        <span className="underline">سبد خرید</span>
                    </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">7

                        {cart && cart.map(renderProduct)}
                    </div>
                    <div
                        className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
                    <div className="flex-1">
                        <div className="sticky top-28">
                            <h3 className="text-lg font-semibold ">مشخصات سفارش</h3>
                            <div
                                className="mt-7 text-sm text-slate-500 dark:text-slate-400 divide-y divide-slate-200/70 dark:divide-slate-700/80">
                                <div className="flex justify-between pb-4">
                                    <span>محصولات</span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                                        {sumPrice.toLocaleString()} تومان
                                    </span>
                                </div>
                                <div className="flex justify-between py-4">
                                    <span>تخفیف</span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                                        0 تومان
                                    </span>
                                </div>

                                <div
                                    className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                                    <span>مجموع</span>
                                    <span>
                                        {sumPrice.toLocaleString()} تومان
                                    </span>
                                </div>
                            </div>
                            <ButtonPrimary href="/checkout" className="mt-8 w-full">
                                پرداخت
                            </ButtonPrimary>
                            <div
                                className="mt-5 text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center">
                                <p className="block relative pl-5">
                                    <svg
                                        className="w-4 h-4 absolute -left-1 top-0.5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                    >
                                        <path
                                            d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M12 8V13"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M11.9945 16H12.0035"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    مشاهده{` `}
                                    <a
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href="##"
                                        className="text-slate-900 dark:text-slate-200 underline font-medium"
                                    >
                                        قوانین
                                    </a>

                                    {` `} سایت
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CartPage;
