"use client";

import React, {FC, useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Radio from "@/shared/Radio/Radio";
import {select} from "@/services/api/shop/delivery";
import {useQuery} from "react-query";
import {myOnHoldOrder} from "@/services/api/shop/onHoldOrder";
import {getDelivery} from "@/services/api/shop/checkout";
import {DeliveryResponse} from "@/services/types/delivery";
import {FaTruck} from "react-icons/fa";
import {FaSignsPost} from "react-icons/fa6";

interface Props {
    isActive: boolean;
    shippingMethod: number;
    onCloseActive: () => void;
    onOpenActive: () => void;
    setShippingMethod: (n: number) => void;
}

const ShippingMethod: FC<Props> = ({
                                       isActive,
                                       onCloseActive,
                                       setShippingMethod,
                                       shippingMethod,
                                       onOpenActive,
                                   }) => {
    const [mothodActive, setMethodActive] = useState<number>(shippingMethod);
    const [selectedId, setSelectedId] = useState(1);
    const {data: data} = useQuery({
        queryKey: ['get-shipping-methods'],
        queryFn: () => getDelivery(),
        staleTime: 5000,
    });

    async function submit() {
        let response = await select({id: selectedId})
    }

    const renderItem = (item: DeliveryResponse) => {
        const active = mothodActive === item.id;
        return (
            <div className="flex items-start gap-x-4 sm:gap-x-6">
                <Radio
                    className="pt-3.5"
                    name="payment-method"
                    id={item.name}
                    defaultChecked={active}
                    onChange={() => {
                        setMethodActive(item.id as any);
                        setSelectedId(item.id as any);
                        setShippingMethod(item.id);
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
                            <FaTruck/>
                        </div>
                        <p className="font-medium"> {item.name} </p>
                        <small className={"text-slate-600 dark:text-slate-300"}>
                            (هزینه ارسال با مشتری)
                        </small>
                    </label>

                </div>
            </div>
        );
    };

    const renderShippingMethod = () => {
        return (
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl ">
                <div className="p-6 flex flex-col sm:flex-row items-start justify-between">
                    <div className="flex items-center">
            <span className="hidden sm:block">
               <FaSignsPost/>
            </span>
                        <div className="sm:mr-8">
                            <h3 className=" text-slate-700 dark:text-slate-400 flex ">
                                <span className="uppercase tracking-tight">روش ارسال</span>

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
                    className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-3 ${isActive ? "block" : "hidden"
                    }`}
                >
                    {
                        data && data.map((item) => (
                            <div key={item.id}>
                                {renderItem(item)}
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    };

    return renderShippingMethod();
};

export default ShippingMethod;
