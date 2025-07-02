"use client"
import {NoSymbolIcon, CheckIcon} from "@heroicons/react/24/outline";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "react-query";
import {decreaseCartItem, getCart, increaseCartItem, removeCartItem} from "@/services/api/shop/cart";
import {CartResponse} from "@/services/types/cart";
import {
    reduxDecrementQuantity,
    reduxIncrementQuantity,
    reduxRemoveFromCart,
    setCart,
    useCart,
    useUser
} from "@/services/globalState/GlobalState";
import {Fragment, useMemo} from "react";
import {Alert} from "@/shared/Alert/Alert";
import {GuarantyPrice} from "@/hooks/GuarantyPrice";
import Prices from "@/components/Price/Prices";
import CartController from "@/components/CartController/CartController";

const CartPage = () => {
    const [cart] = useCart();
    const [user] = useUser();

    const {data, isSuccess} = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart(),
        staleTime: 5000,
        enabled: !!user,
        onSuccess: (cartData) => {
            setCart(cartData);
        }
    });


    async function increaseHandle(selectedColorId: number, guarantyId: number | undefined) {
        let response = await increaseCartItem({productColorId: selectedColorId, guaranty_id: guarantyId});
        if (response.success) {
            reduxIncrementQuantity(selectedColorId, guarantyId)
        }
    }

    async function decreaseHandle(selectedColorId: number, guarantyId: number | undefined) {
        let response = await decreaseCartItem({productColorId: selectedColorId, guaranty_id: guarantyId});
        if (response.success) {
            reduxDecrementQuantity(selectedColorId, guarantyId)
        }

    }

    async function removeHandle(selectedColorId: number, guarantyId: number | undefined) {
        let response = await removeCartItem({productColorId: selectedColorId, guaranty_id: guarantyId});
        if (response.success) {
            reduxRemoveFromCart(selectedColorId, guarantyId)
        }
    }

    const renderStatusSoldout = () => {
        return (
            <div
                className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <NoSymbolIcon className="w-3.5 h-3.5"/>
                <span className="mr-1 leading-none">ناموجود</span>
            </div>
        );
    };

    const renderStatusInstock = () => {
        return (
            <div
                className="rounded-full flex items-center justify-center px-2.5 py-1.5 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <CheckIcon className="w-3.5 h-3.5"/>
                <span className="mr-1 leading-none">  موجود</span>
            </div>
        );
    };

    const renderProduct = (item: CartResponse, index: number) => {
        let guarantyPrice = 0;
        if (!item.guaranty.free) {
            guarantyPrice = GuarantyPrice(item.color.price) ?? 0;
        }
        return (
            <Fragment key={index}>
                {/*<head>*/}
                {/*    <title>سبد خرید</title>*/}
                {/*</head>*/}
                <div
                    key={index}
                    className="relative flex py-8 sm:py-10 xl:py-12 first:pt-0 last:pb-0"
                >
                    <div className="relative h-24 w-24   flex-shrink-0 overflow-hidden rounded-xl  ">
                        <Image
                            fill
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.product.image}`}
                            alt={item.product.name}
                            sizes="300px"
                            className="h-full w-full object-contain object-center"
                        />
                        <Link href={{pathname: "/product/" + item.product.url}} className="absolute inset-0"></Link>
                    </div>

                    <div className="mr-3 sm:ml-6 flex flex-1 flex-col">
                        <div>
                            <div className="flex justify-between gap-1 flex-col  ">
                                <div className="flex-[1.5] ">
                                    <h3 className="text-xs md:text-sm font-semibold">
                                        <Link
                                            href={{pathname: "/product/" + item.product.url}}>{item.product.name}</Link>
                                    </h3>
                                    <div className=" flex text-sm text-slate-600 dark:text-slate-300">
                                        <div className="flex items-center gap-x-1.5">
                                            <span>{item.color.title}</span>
                                        </div>

                                        <span className="mx-4 border-l border-slate-200 dark:border-slate-700 "></span>

                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <span className="text-xs text-slate-500 dark:text-slate-400">
                                            {item.guaranty.name}
                                        </span>
                                        {
                                            (!item.guaranty || item.guaranty.free) ?
                                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                                    (رایگان)
                                                </span>
                                                :
                                                <span
                                                    className={`text-xs text-slate-500 dark:text-slate-400`}>{new Intl.NumberFormat('en-US').format(GuarantyPrice(item.color.price))} تومان </span>
                                        }
                                    </div>
                                </div>
                                <div className="  flex-1  flex justify-end ">
                                    <Prices price={(item.color.price + guarantyPrice) * item.count} className="mt-0.5"/>
                                </div>

                                <div className=" block text-center relative">
                                    <CartController className="relative z-10"
                                                    defaultValue={item.count}
                                                    increaseHandle={() => {
                                                        increaseHandle(item.color.id as number, item.guaranty.id as number)
                                                    }}
                                                    decreaseHandel={() => {
                                                        decreaseHandle(item.color.id as number, item.guaranty.id as number)
                                                    }}
                                                    removeHandle={() => {
                                                        removeHandle(item.color.id as number, item.guaranty.id as number)
                                                    }}

                                    />
                                </div>

                            </div>
                        </div>

                        <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                            {!item.hasStock
                                ? renderStatusSoldout()
                                : renderStatusInstock()}

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    const renderSumPrice = () => {
        let sumPrice: number = 0;
        cart.map((item) => {
            sumPrice += Number(item.color.price * item.count);
        })
        return sumPrice;
    }
    const renderSumGuarantyPrice = () => {
        let sumPrice: number = 0;
        cart.map((item) => {
            if (!item.guaranty.free) {
                sumPrice += GuarantyPrice(item.color.price) ?? 0;
            }
        })
        return sumPrice;
    }

    const renderDiscountedPrice = () => {

        return sumPrice - sumDiscount + sumGuarantyPrice;
    }
    const renderAllow = () => {
        let allow: boolean = true;
        cart.map((item) => {
            if (item.color.status == 0 || !item.hasStock) {
                allow = false
            }
        })
        return allow;
    }
    const renderLimit = () => {
        let limit: boolean = false;
        cart.map((item) => {
            if (item.color.status == 2) {
                limit = true
            }
        })
        return limit;
    }
    const renderDiscount = () => {
        let sumDiscount: number = 0;
        cart.map((item) => {
            if (item.color.discountedPrice > 0)
                sumDiscount += Number((item.color.price - item.color.discountedPrice) * item.count);
        })
        return sumDiscount;
    }

    const sumPrice = useMemo(() => renderSumPrice(), [cart, renderSumPrice]);
    const allow = useMemo(() => renderAllow(), [cart, renderAllow]);
    const limit = useMemo(() => renderLimit(), [cart, renderLimit]);
    const sumGuarantyPrice = useMemo(() => renderSumGuarantyPrice(), [cart, renderSumGuarantyPrice]);
    const sumDiscount = useMemo(() => renderDiscount(), [cart, renderDiscount]);
    const sumDiscountedPrice = useMemo(() => renderDiscountedPrice(), [cart, renderDiscountedPrice]);
    return (
        <div className="nc-CartPage dark:bg-slate-900 dark:text-white">
            <main className="container py-16 lg:pb-28 lg:pt-20 ">
                <div className="mb-12 sm:mb-16">
                    <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
                        سبد خرید
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

                <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12"/>

                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
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
                                        {sumDiscount.toLocaleString()} تومان
                                    </span>
                                </div>
                                <div className="flex justify-between py-4">
                                    <span>مجموع قیمت گارانتی</span>
                                    <span className="font-semibold text-slate-900 dark:text-slate-200">
                                        {sumGuarantyPrice.toLocaleString()} تومان
                                    </span>
                                </div>
                                <div
                                    className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                                    <span>مجموع</span>
                                    <span>
                                        {sumDiscountedPrice.toLocaleString()} تومان
                                    </span>
                                </div>
                            </div>


                            <ButtonPrimary href="/checkout" className="mt-8 w-full" disabled={!allow}>
                                {
                                    limit ? "ثبت درخواست" : "پرداخت"
                                }
                            </ButtonPrimary>
                            {
                                !allow &&
                                <Alert containerClassName={"justify-center mt-4"} type={"error"}>محصول غیرفعال در سبد
                                    خرید موجود میباشد </Alert>
                            } {
                            limit &&
                            <Alert containerClassName={" justify-center mt-4"} type={"warning"}>محصول محدود کننده در سبد
                                خرید موجود میباشد . پس از تایید مدیریت امکان پرداخت وجود دارد </Alert>
                        }
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
                                        href="/page/rule"
                                        className="text-slate-900 dark:text-slate-200  font-medium"
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
