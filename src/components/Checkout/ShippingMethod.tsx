"use client";

import React, {FC, useState} from "react";
import Image from "next/image";
import Radio from "@/shared/Radio/Radio";
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
    deliveries?: DeliveryResponse[];
}

function DeliveryLogo({logo}: {logo?: string}) {
    if (!logo) return <FaTruck aria-hidden="true" className="h-6 w-6 text-slate-400"/>;
    const src = /^https?:\/\//i.test(logo) ? logo
        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.replace(/\/$/, "")}/delivery/${logo.replace(/^\//, "")}`;
    return <Image src={src} alt="" width={48} height={48} unoptimized className="h-12 w-12 shrink-0 object-contain"/>;
}

const ShippingMethod: FC<Props> = ({
                                       isActive,
                                       onCloseActive,
                                       setShippingMethod,
                                       shippingMethod,
                                       onOpenActive,
                                       deliveries,
                                   }) => {
    const [open, setOpen] = useState(false);
    const selectedItem = deliveries?.find((item) => item.id === shippingMethod);

    const priceLabel = (price?: number) =>
        price === 0 ? "(هزینه ارسال با مشتری)" : (price ?? 0).toLocaleString() + " تومان ";

    const renderItem = (item: DeliveryResponse) => {
        const active = shippingMethod === item.id;
        return (
            <label
                htmlFor={item.name}
                className="flex flex-wrap items-center justify-between gap-3 cursor-pointer py-3"
            >
                <div className="flex min-w-0 items-center gap-3">
                    <Radio
                        name="shipping-method"
                        id={item.name}
                        checked={active}
                        onChange={() => {
                            setShippingMethod(item.id);
                        }}
                    />
                    <div
                        className={`shrink-0 bg-white p-2 rounded-xl border-2 ${active
                            ? "border-slate-600 dark:border-slate-300"
                            : "border-gray-200 dark:border-slate-600"
                        }`}
                    >
                        <DeliveryLogo logo={item.logo}/>
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
            <div className="flex flex-wrap items-center justify-between gap-3">
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

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white"><DeliveryLogo logo={selectedItem?.logo}/></div>
                    <span>{selectedItem?.name ?? "روش ارسال در دسترس نیست"}</span>
                </div>
                <span className="text-emerald-600 text-sm">
                    {selectedItem ? priceLabel(selectedItem.price) : "—"}
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
                        {deliveries && deliveries.map((item) => (
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
