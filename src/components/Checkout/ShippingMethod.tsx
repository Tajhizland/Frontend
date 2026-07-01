"use client";

import React, {FC, useEffect, useState} from "react";
import Radio from "@/shared/Radio/Radio";
import {select} from "@/services/api/shop/delivery";
import {useQuery} from "react-query";
import {getDelivery} from "@/services/api/shop/checkout";
import {DeliveryResponse} from "@/services/types/delivery";
import {FaTruck} from "react-icons/fa";
import {FaSignsPost} from "react-icons/fa6";
import {FiChevronLeft} from "react-icons/fi";
import NcModal from "@/shared/NcModal/NcModal";

interface Props {
    isActive: boolean;
    shippingMethod: number;
    onCloseActive: () => void;
    onOpenActive: () => void;
    setShippingMethod: (n: number) => void;
    setShippingPrice: (n: number) => void;

}

const ShippingMethod: FC<Props> = ({
                                       isActive,
                                       onCloseActive,
                                       setShippingMethod,
                                       shippingMethod,
                                       setShippingPrice,
                                       onOpenActive,
                                   }) => {
    const [mothodActive, setMethodActive] = useState<number>(shippingMethod);
    const [selectedId, setSelectedId] = useState(1);
    const [open, setOpen] = useState(false);
    const {data: data} = useQuery({
        queryKey: ['get-shipping-methods'],
        queryFn: () => getDelivery(),
        staleTime: 5000,
    });


    useEffect(() => {
        if (data)
            setShippingPrice(data?.[0]?.price ?? 0);
    }, [data]);

    async function submit() {
        let response = await select({id: selectedId})
    }

    const selectedItem = data?.find((item) => item.id === mothodActive) ?? data?.[0];

    const priceLabel = (price?: number) =>
        price === 0 ? "(هزینه ارسال با مشتری)" : (price ?? 0).toLocaleString() + " تومان ";

    const renderItem = (item: DeliveryResponse) => {
        const active = mothodActive === item.id;
        return (
            <label
                htmlFor={item.name}
                className="flex items-center justify-between gap-x-4 cursor-pointer py-2"
            >
                <div className="flex items-center gap-x-4">
                    <Radio
                        name="shipping-method"
                        id={item.name}
                        defaultChecked={active}
                        onChange={() => {
                            setMethodActive(item.id as any);
                            setSelectedId(item.id as any);
                            setShippingMethod(item.id);
                            setShippingPrice(item.price);
                        }}
                    />
                    <div
                        className={`p-2.5 rounded-xl border-2 ${active
                            ? "border-slate-600 dark:border-slate-300"
                            : "border-gray-200 dark:border-slate-600"
                        }`}
                    >
                        <FaTruck/>
                    </div>
                    <p className="font-medium"> {item.name} </p>
                </div>
                <small className="text-slate-600 dark:text-slate-300">
                    {priceLabel(item?.price)}
                </small>
            </label>
        );
    };

    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <FaSignsPost/>
                    <span className="font-medium">روش ارسال کالا</span>
                </div>
                <button
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400"
                    onClick={() => setOpen(true)}
                >
                    تغییر شیوه ارسال
                    <FiChevronLeft/>
                </button>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <FaTruck className="text-slate-400"/>
                    <span>{selectedItem?.name}</span>
                </div>
                <span className="text-emerald-600 text-sm">
                    {priceLabel(selectedItem?.price)}
                </span>
            </div>

            <NcModal
                isOpenProp={open}
                onCloseModal={() => setOpen(false)}
                hasButton={false}
                modalTitle="روش ارسال کالا"
                contentExtraClass="max-w-2xl"
                renderContent={() => (
                    <div className="divide-y divide-slate-100 dark:divide-slate-700">
                        {data && data.map((item) => (
                            <div key={item.id}>
                                {renderItem(item)}
                            </div>
                        ))}
                    </div>
                )}
            />
        </div>
    );
};

export default ShippingMethod;
