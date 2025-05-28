"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ProductResponse } from "@/services/types/product";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonClose from "@/shared/Button/ButtonClose";

interface ComparePageProps {
    compareList: ProductResponse[];
    close: ()=>void;
    setCompareList: React.Dispatch<React.SetStateAction<ProductResponse[]>>;
}

export default function Compare({ compareList, setCompareList,close }: ComparePageProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // بررسی اولیه
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // محدود کردن تعداد محصولات نمایش‌داده‌شده بر اساس دستگاه
    const displayedCompareProducts = isMobile ? compareList.slice(0, 2) : compareList.slice(0, 3);

    // اگر compareList خالی باشد
    if (compareList.length === 0) {
        return (
            <div className="container py-16 lg:pb-28 lg:pt-20 dark:bg-neutral-900">
                <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                    مقایسه محصولات
                </h2>
                <p className="mt-4 text-neutral-500 dark:text-neutral-400">
                    هیچ محصولی برای مقایسه انتخاب نشده است.
                </p>
            </div>
        );
    }

    // گرفتن تمام آپشن‌ها از محصولات موجود در compareList
    const allOptions = Array.from(
        new Set(
            compareList.flatMap((product) =>
                product.productOptions.data.map((opt) => ({
                    option_item_id: opt.option_item_id,
                    option_title: opt.option_title,
                }))
            )
        )
    );

    return (
        <div className="container py-16 lg:pb-28 lg:pt-20 bg-white dark:bg-neutral-900 space-y-8 fixed top-0 right-0 left-0 w-full h-screen z-[100] overflow-y-auto">
             <span className="absolute right-2 top-2 p-1">
                    <ButtonClose onClick={close} />
                </span>
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                مقایسه محصولات
            </h2>

            <div
                className={`grid gap-5 text-xs sm:text-sm font-bold text-slate-800 dark:text-white`}
                style={{
                    gridTemplateColumns: `repeat(${1 + displayedCompareProducts.length}, minmax(0, 1fr))`,
                }}
            >
                {/* ستون عنوان ویژگی‌ها */}
                <div className="flex flex-col divide-y">
                    <div className="w-[100px] h-[100px]"></div>
                    <h2 className="py-5 line-clamp-1">نام محصول</h2>
                    {allOptions.map((option, index) => (
                        <div key={index} className="py-5 font-bold">
                            {option.option_title}
                        </div>
                    ))}
                </div>

                {/* ستون محصولات مقایسه‌ای */}
                {displayedCompareProducts.map((product, i) => (
                    <div key={i} className="flex flex-col divide-y relative">
                        <div className="w-[100px] h-[100px] relative">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product.images.data[0].url}`}
                                alt="image"
                                width={100}
                                height={100}
                            />
                            <button
                                onClick={() =>
                                    setCompareList((prev) => prev.filter((p) => p.id !== product.id))
                                }
                                className="absolute top-0 left-0 text-red-500 text-xs bg-white rounded px-1"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="py-5">
                            <h2 className="line-clamp-1">{product.name}</h2>
                        </div>
                        {allOptions.map((mainOption, index) => {
                            const matchedOption = product.productOptions.data.find(
                                (opt) => opt.option_item_id === mainOption.option_item_id
                            );
                            return (
                                <div key={index} className="py-5 line-clamp-1 whitespace-nowrap">
                                    {!matchedOption?.value?.trim() ? "---" : matchedOption.value}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
