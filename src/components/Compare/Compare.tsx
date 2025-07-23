"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {ProductResponse} from "@/services/types/product";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonClose from "@/shared/Button/ButtonClose";
import NcModal from "@/shared/NcModal/NcModal";
import Input from "@/shared/Input/Input";
import {useMutation} from "react-query";
import {search} from "@/services/api/shop/compare";

interface ComparePageProps {
    compareList: ProductResponse[];
    close: () => void;
    setCompareList: React.Dispatch<React.SetStateAction<ProductResponse[]>>;
}

export default function Compare({compareList, setCompareList, close}: ComparePageProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [compareProducts, setCompareProducts] = useState<ProductResponse[]>(compareList);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize(); // بررسی اولیه
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (isMobile) {
            setIsButtonDisabled(compareProducts.length >= 2);
        } else {
            setIsButtonDisabled(compareProducts.length >= 3);
        }
    }, [compareProducts, isMobile]);

    // محدود کردن تعداد محصولات نمایش‌داده‌شده بر اساس دستگاه
    const displayedCompareProducts = isMobile ? compareProducts.slice(0, 2) : compareProducts.slice(0, 3);

    const {
        data: newProduct,
        mutateAsync: searchCompareHandler,
        isLoading: searchCompareLoading,
    } = useMutation({
        mutationKey: ["search-compare-product"],
        mutationFn: (e: any) =>
            search({query: e.target.value, categoryIds: compareList?.[0].category_ids ?? []}),
    });

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

            <div
                className="  py-16 lg:pb-28 lg:pt-20 bg-white dark:bg-neutral-900 space-y-8 fixed top-0 right-0 left-0 w-full h-screen z-[100] overflow-y-auto">
                <div
                    className="container ">
             <span className="absolute right-2 top-2 p-1">
                    <ButtonClose onClick={close}/>
                </span>
                    <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold dark:text-white">
                        مقایسه محصولات
                    </h2>

                    <ButtonPrimary className={"mt-5"} onClick={() => setOpenModal(true)} disabled={isButtonDisabled}>
                        انتخاب محصول
                    </ButtonPrimary>

                    {/* ستون عنوان ویژگی‌ها */}
                    <div className="flex flex-col gap-5 divide-y mt-5">
                        <div
                            className={`grid gap-5 text-xs sm:text-sm font-bold text-slate-800 dark:text-white`}
                            style={{
                                gridTemplateColumns: `repeat(${displayedCompareProducts.length}, minmax(0, 1fr))`,
                            }}
                        >
                            {displayedCompareProducts.map((product, i) => (
                                <div key={i}
                                     className="flex flex-col relative border rounded-xl justify-center items-center">
                                    <div className="w-fit h-full relative">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${product.images.data[0].url}`}
                                            alt="image"
                                            width={250}
                                            height={250}
                                        />

                                    </div>
                                    <div className="py-5">
                                        <h2 className="line-clamp-1">{product.name}</h2>
                                    </div>
                                    <button
                                        onClick={() =>
                                            setCompareProducts((prev) => prev.filter((p) => p.id !== product.id))
                                        }
                                        className="absolute top-0 left-0 text-red-500 text-xs bg-white rounded px-1"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        {allOptions.map((option, index) => (
                            <div key={index} className={"flex flex-col gap-1"}>
                                <div className="py-5 font-bold text-black">
                                    {option.option_title}
                                </div>
                                <div
                                    className={`grid gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-white`}
                                    style={{
                                        gridTemplateColumns: `repeat(${displayedCompareProducts.length}, minmax(0, 1fr))`,
                                    }}
                                >

                                    {/* ستون محصولات مقایسه‌ای */}
                                    {displayedCompareProducts.map((product, i) => (
                                        <div key={i} className="flex flex-col divide-y relative">
                                            <div key={index} className="py-5 line-clamp-1 whitespace-nowrap text-center">
                                                {!product.productOptions.data.find(
                                                    (opt) => opt.option_item_id === allOptions[index].option_item_id
                                                )?.value?.trim() ? "---" :
                                                    //@ts-ignore
                                                    product?.productOptions?.data?.find(
                                                    (opt) => opt?.option_item_id === allOptions[index]?.option_item_id
                                                ).value}
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>

                        ))}
                    </div>

                </div>
            </div>
        </>
    )
        ;
}
