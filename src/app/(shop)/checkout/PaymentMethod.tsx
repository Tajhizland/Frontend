"use client";

import Label from "@/components/Label/Label";
import React, {FC, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Input from "@/shared/Input/Input";
import Radio from "@/shared/Radio/Radio";
import {select} from "@/services/api/shop/delivery";

interface Props {
    isActive: boolean;
    onCloseActive: () => void;
    onOpenActive: () => void;
}

const PaymentMethod: FC<Props> = ({
                                      isActive,
                                      onCloseActive,
                                      onOpenActive,
                                  }) => {
    const [mothodActive, setMethodActive] = useState<
        "post"
    >("post");
    const [selectedId, setSelectedId] = useState(1);

    async function submit() {
        let response = await select({id: selectedId})
    }

    const renderPost = () => {
        const active = mothodActive === "post";
        return (
            <div className="flex items-start gap-x-4 sm:gap-x-6">
                <Radio
                    className="pt-3.5"
                    name="payment-method"
                    id="Internet-banking"
                    defaultChecked={active}
                    onChange={(e) => {
                        setMethodActive(e as any) ,
                        setSelectedId(1 as any)
                    }}
                />
                <div className="flex-1">
                    <label
                        htmlFor="Internet-banking"
                        className="flex items-center gap-x-4 sm:gap-x-6"
                    >
                        <div
                            className={`p-2.5 rounded-xl border-2 ${active
                                ? "border-slate-600 dark:border-slate-300"
                                : "border-gray-200 dark:border-slate-600"
                            }`}
                        >
                            <svg
                                className="w-6 h-6 sm:w-7 sm:h-7"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M7.99998 3H8.99998C7.04998 8.84 7.04998 15.16 8.99998 21H7.99998"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15 3C16.95 8.84 16.95 15.16 15 21"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 16V15C8.84 16.95 15.16 16.95 21 15V16"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 9.0001C8.84 7.0501 15.16 7.0501 21 9.0001"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <p className="font-medium"> پست </p>
                    </label>

                </div>
            </div>
        );
    };

    const renderPaymentMethod = () => {
        return (
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                <div className="p-6 flex flex-col sm:flex-row items-start justify-between">
                    <div className="flex items-center">
            <span className="hidden sm:block">
              <svg
                  className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M3.92969 15.8792L15.8797 3.9292"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M11.1013 18.2791L12.3013 17.0791"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M13.793 15.5887L16.183 13.1987"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M2 21.9985H22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
              </svg>
            </span>
                        <div className="sm:mr-8">
                            <h3 className=" text-slate-700 dark:text-slate-400 flex ">
                                <span className="uppercase tracking-tight">روش ارسال</span>
                                <svg
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 ml-3 text-slate-900"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </h3>
                        </div>
                    </div>
                    <button
                        className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0  text-sm font-medium rounded-lg"
                        onClick={onOpenActive}
                    >
                        ویرایش
                    </button>

                </div>

                <div
                    className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-6 ${isActive ? "block" : "hidden"
                    }`}
                >
                    <div>{renderPost()}</div>


                    <div className="flex pt-6">
                        <ButtonPrimary
                            className="w-full max-w-[240px]"
                            onClick={submit}
                        >
                            ذخیره
                        </ButtonPrimary>
                    </div>
                </div>
            </div>
        );
    };

    return renderPaymentMethod();
};

export default PaymentMethod;
