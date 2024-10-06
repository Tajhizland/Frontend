"use client";

import Label from "@/components/Label/Label";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import {Product, PRODUCTS} from "@/data/data";
import {useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import Image from "next/image";
import Link from "next/link";
import {useQuery} from "react-query";
import {decreaseCartItem, getCart, increaseCartItem, removeCartItem} from "@/services/api/shop/cart";
import {CartResponse} from "@/services/types/cart";
import {
    reduxDecrementQuantity,
    reduxIncrementQuantity, reduxRemoveFromCart,
    setCart,
    useCart,
    useUser
} from "@/services/globalState/GlobalState";
import {useRouter} from "next/navigation";

const CheckoutPage = () => {
    const router = useRouter();
    const [cart] = useCart();
    const [user] = useUser();
    if (!user) {
        router.push("/login");
    }
    const {data, isSuccess} = useQuery({
        queryKey: ['cart'],
        queryFn: () => getCart(),
        staleTime: 5000,
        enabled: !!user,
        onSuccess: (cartData) => {
            setCart(cartData);
        }
    });


    async function increaseHandle(selectedColorId: number) {
        let response = await increaseCartItem({productColorId: selectedColorId});
        if (response.success) {
            reduxIncrementQuantity(selectedColorId)
        }
    }

    async function decreaseHandle(selectedColorId: number) {
        let response = await decreaseCartItem({productColorId: selectedColorId});
        if (response.success) {
            reduxDecrementQuantity(selectedColorId)
        }

    }

    async function removeHandle(selectedColorId: number) {
        let response = await removeCartItem({productColorId: selectedColorId});
        if (response.success) {
            reduxRemoveFromCart(selectedColorId)
        }
    }

    const [tabActive, setTabActive] = useState<
        "ContactInfo" | "ShippingAddress" | "PaymentMethod"
    >("ShippingAddress");

    const handleScrollToEl = (id: string) => {
        const element = document.getElementById(id);
        setTimeout(() => {
            element?.scrollIntoView({behavior: "smooth"});
        }, 80);
    };


    const renderProduct = (item: CartResponse, index: number) => {

        return (
            <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
                <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image
                        src={item.product.image}
                        fill
                        alt={item.product.name}
                        className="h-full w-full object-contain object-center"
                        sizes="150px"
                    />
                    <Link href={{pathname: "product/" + item.product.url}} className="absolute inset-0"></Link>
                </div>

                <div className="mr-3 sm:ml-6 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between ">
                            <div className="flex-[1.5] ">
                                <h3 className="text-base font-semibold">
                                    <Link href={{pathname: "product/" + item.product.url}}>{item.product.name}</Link>
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

                                <div className="mt-3 flex justify-between w-full sm:hidden relative">
                                    <select
                                        name="qty"
                                        id="qty"
                                        className="form-select text-sm rounded-md py-1 border-slate-200 dark:border-slate-700 relative z-10 dark:bg-slate-800 "
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                    </select>
                                    <Prices
                                        contentClass="py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium h-full"
                                        price={item.color.price}
                                    />
                                </div>
                            </div>

                            <div className="hidden flex-1 sm:flex justify-end">
                                <Prices price={item.color.price} className="mt-0.5"/>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                        <div className="hidden sm:block text-center relative">
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

                        <a
                            href="##"
                            className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm "
                        >
                            <span>حذف</span>
                        </a>
                    </div>
                </div>
            </div>
        );
    };

    const renderLeft = () => {
        return (
            <div className="space-y-8">
                <div id="ContactInfo" className="scroll-mt-24">
                    <ContactInfo
                        isActive={tabActive === "ContactInfo"}
                        onOpenActive={() => {
                            setTabActive("ContactInfo");
                            handleScrollToEl("ContactInfo");
                        }}
                        onCloseActive={() => {
                            setTabActive("ShippingAddress");
                            handleScrollToEl("ShippingAddress");
                        }}
                    />
                </div>

                <div id="ShippingAddress" className="scroll-mt-24">
                    <ShippingAddress
                        isActive={tabActive === "ShippingAddress"}
                        onOpenActive={() => {
                            setTabActive("ShippingAddress");
                            handleScrollToEl("ShippingAddress");
                        }}
                        onCloseActive={() => {
                            setTabActive("PaymentMethod");
                            handleScrollToEl("PaymentMethod");
                        }}
                    />
                </div>

                <div id="PaymentMethod" className="scroll-mt-24">
                    <PaymentMethod
                        isActive={tabActive === "PaymentMethod"}
                        onOpenActive={() => {
                            setTabActive("PaymentMethod");
                            handleScrollToEl("PaymentMethod");
                        }}
                        onCloseActive={() => setTabActive("PaymentMethod")}
                    />
                </div>
            </div>
        );
    };

    const renderSumPrice = () => {
        let sumPrice: number = 0;
        cart?.map((item) => {
            sumPrice += Number(item.color.price * item.count);
        })
        return sumPrice;
    }

    return (
        <div className="nc-CheckoutPage">
            <main className="container py-16 lg:pb-28 lg:pt-20 ">
                <div className="mb-16">
                    <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
                        پرداخت
                    </h2>
                    <div
                        className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
                        <Link href={"/"} className="">
                            صفحه اصلی
                        </Link>
                        <span className="text-xs mx-1 sm:mx-1.5">/</span>
                        <Link href={"/cart"} className="">
                            سبد خرید
                        </Link>
                        <span className="text-xs mx-1 sm:mx-1.5">/</span>
                        <span className="underline">پرداخت</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="flex-1">{renderLeft()}</div>

                    <div
                        className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

                    <div className="w-full lg:w-[36%] ">
                        <h3 className="text-lg font-semibold">مشخصات سفارش</h3>
                        <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700 ">
                            {cart && cart.map(renderProduct)}
                        </div>

                        <div
                            className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700 ">
                            <div>
                                <Label className="text-sm">کد تخفیف</Label>
                                <div className="flex mt-1.5">
                                    <Input sizeClass="h-10 px-4 py-3" className="flex-1"/>
                                    <button
                                        className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                                        اعمال
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between py-2.5">
                                <span>محصولات</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  {renderSumPrice().toLocaleString()} تومان
                </span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span> تخفیف  </span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">
                  0
                </span>
                            </div>
                            <div
                                className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                                <span> مجموع  </span>
                                <span>
                  {renderSumPrice().toLocaleString()} تومان
                </span>
                            </div>
                        </div>
                        <ButtonPrimary className="mt-8 w-full">پرداخت</ButtonPrimary>
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
                                Learn more{` `}
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="##"
                                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                                >
                                    Taxes
                                </a>
                                <span>
                  {` `}and{` `}
                </span>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="##"
                                    className="text-slate-900 dark:text-slate-200 underline font-medium"
                                >
                                    Shipping
                                </a>
                                {` `} infomation
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckoutPage;
