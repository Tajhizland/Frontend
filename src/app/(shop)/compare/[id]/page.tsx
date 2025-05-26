"use client";
import { useMutation, useQuery } from "react-query";
import { useParams } from "next/navigation";
import { find, search } from "@/services/api/shop/compare";
import Spinner from "@/shared/Loading/Spinner";
import React, { useState } from "react";
import Image from "next/image";
import Input from "@/shared/Input/Input";
import { ProductResponse } from "@/services/types/product";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {
    const { id } = useParams();
    const [compareProducts, setCompareProducts] = useState<ProductResponse[]>([]);
    const [openModal, setOpenModal] = useState(false);

    const { data: product } = useQuery({
        queryKey: ["compare-find"],
        queryFn: () => find(Number(id)),
        staleTime: 5000,
    });

    const {
        data: newProduct,
        mutateAsync: searchCompareHandler,
        isLoading: searchCompareLoading,
    } = useMutation({
        mutationKey: ["city"],
        mutationFn: (e: any) =>
            search({ query: e.target.value, categoryIds: product?.category_ids ?? [] }),
    });

    const renderContent = () => (
        <div>
            <div className="mt-8 relative rounded-md shadow-sm">
                <Input
                    type="text"
                    placeholder="جستجوی نام محصول"
                    onChange={(e) => searchCompareHandler(e)}
                />
            </div>
            <div className="mt-5 max-h-96 overflow-y-scroll">
                <div className="flex flex-col gap-y-5">
                    {newProduct &&
                        newProduct.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border shadow rounded pl-5 cursor-pointer hover:bg-slate-100"
                                onClick={() => {
                                    if (!compareProducts.find((p) => p.id === item.id)) {
                                        setCompareProducts((prev) => [...prev, item]);
                                    }
                                    setOpenModal(false);
                                }}
                            >
                                <div className="w-[100px] h-[100px]">
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.images.data[0].url}`}
                                        alt="image"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <span>{item.name}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );

    if (!product) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <Spinner />
            </div>
        );
    }

    // فقط اولین یا دو محصول در دسکتاپ نمایش داده شود
    const displayedCompareProducts =
        typeof window !== "undefined" && window.innerWidth < 768
            ? compareProducts.slice(0, 1)
            : compareProducts.slice(0, 2);

    return (
        <>
            <NcModal
                isOpenProp={openModal}
                onCloseModal={() => setOpenModal(false)}
                contentExtraClass="max-w-4xl"
                renderContent={renderContent}
                triggerText=""
                modalTitle="افزودن"
                hasButton={false}
            />

            <div className="container py-16 lg:pb-28 lg:pt-20 dark:bg-neutral-900 space-y-8">
                <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                    مقایسه محصولات
                </h2>
                <ButtonPrimary onClick={() => setOpenModal(true)}>
                    انتخاب محصول
                </ButtonPrimary>

                <div
                    className={`grid gap-5 text-xs sm:text-sm font-bold text-slate-800 dark:text-white`}
                    style={{
                        gridTemplateColumns: `repeat(${2 + displayedCompareProducts.length}, minmax(0, 1fr))`,
                    }}
                >
                    {/* ستون عنوان ویژگی‌ها */}
                    <div className="flex flex-col divide-y">
                        <div className="w-[100px] h-[100px]"></div>
                        <h2 className="py-5 line-clamp-1">نام محصول</h2>
                        {product.productOptions.data.map((option, index) => (
                            <div key={index} className="py-5 font-bold">
                                {option.option_title}
                            </div>
                        ))}
                    </div>

                    {/* ستون محصول اصلی */}
                    <div className="flex flex-col divide-y">
                        <div className="w-[100px] h-[100px]">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product.images.data[0].url}`}
                                alt="image"
                                width={100}
                                height={100}
                            />
                        </div>
                        <div className="py-5">
                            <h2 className="line-clamp-1">{product.name}</h2>
                        </div>
                        {product.productOptions.data.map((option, index) => (
                            <div key={index} className="py-5 line-clamp-1 whitespace-nowrap">
                                {!option.value?.trim() ? "---" : option.value}
                            </div>
                        ))}
                    </div>

                    {/* ستون محصولات مقایسه‌ای */}
                    {displayedCompareProducts.map((compareProduct, i) => (
                        <div key={i} className="flex flex-col divide-y relative">
                            <div className="w-[100px] h-[100px] relative">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${compareProduct.images.data[0].url}`}
                                    alt="image"
                                    width={100}
                                    height={100}
                                />
                                <button
                                    onClick={() =>
                                        setCompareProducts((prev) =>
                                            prev.filter((p) => p.id !== compareProduct.id)
                                        )
                                    }
                                    className="absolute top-0 left-0 text-red-500 text-xs bg-white rounded px-1"
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="py-5">
                                <h2 className="line-clamp-1">{compareProduct.name}</h2>
                            </div>
                            {product.productOptions.data.map((mainOption, index) => {
                                const matchedOption = compareProduct.productOptions.data.find(
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
        </>
    );
}
