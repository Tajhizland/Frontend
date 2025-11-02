"use client";
import {useMutation, useQuery} from "react-query";
import {useParams} from "next/navigation";
import {allProduct, find, search} from "@/services/api/shop/compare";
import Spinner from "@/shared/Loading/Spinner";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Input from "@/shared/Input/Input";
import {ProductResponse} from "@/services/types/product";
import NcModal from "@/shared/NcModal/NcModal";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
 

export default function Page() {
    const {id} = useParams();
    const [compareProducts, setCompareProducts] = useState<ProductResponse[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const {data: product} = useQuery({
        queryKey: ["compare-find"],
        queryFn: () => find(Number(id)),
        staleTime: 5000,
    });


    const {data: all} = useQuery({
        queryKey: ["all-product"],
        queryFn: () => allProduct({categoryIds: product?.category_ids ?? []}),
        staleTime: 5000,
        enabled: !!product
    });

    const {
        data: newProduct,
        mutateAsync: searchCompareHandler,
        isLoading: searchCompareLoading,
    } = useMutation({
        mutationKey: ["search-compare-product"],
        mutationFn: (e: any) =>
            search({query: e.target.value, categoryIds: product?.category_ids ?? []}),
    });

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
            setIsButtonDisabled(compareProducts.length >= 1);
        } else {
            setIsButtonDisabled(compareProducts.length >= 3);
        }
    }, [compareProducts, isMobile]);

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
                    {(newProduct && newProduct.length > 0) ?
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
                        )) :
                        (all && all.length > 0 && all.map((item) => (

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
                        )))
                    }
                </div>
            </div>
        </div>
    );

    if (!product) {
        return (
            <div className="flex justify-center items-center w-full h-screen">
                <Spinner/>
            </div>
        );
    }

    // فقط اولین یا دو محصول در دسکتاپ نمایش داده شود
    const displayedCompareProducts =
        typeof window !== "undefined" && window.innerWidth < 768
            ? compareProducts.slice(0, 1)
            : compareProducts.slice(0, 3);

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


                <div className="flex flex-col gap-5 divide-y mt-5">
                    <div
                        className={`grid gap-5 text-xs sm:text-sm font-bold text-slate-800 dark:text-white`}
                        style={{
                            gridTemplateColumns: `repeat(${1 + displayedCompareProducts.length + (isButtonDisabled ? 0 : 1)}, minmax(0, 1fr))`,
                        }}
                    >
                        <div
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

                        {!isButtonDisabled && <div
                            className="flex flex-col relative justify-center items-center">

                            <ButtonPrimary className={"mt-5"} onClick={() => setOpenModal(true)}
                                           disabled={isButtonDisabled}>
                                انتخاب محصول
                            </ButtonPrimary>
                        </div>}
                    </div>
                </div>
                <div className="flex flex-col divide-y">
                    {product.productOptions.data.map((option, index) => (
                        <div key={index} className={"flex flex-col gap-1"}>
                            <div key={index} className="py-5 font-bold">
                                {option.option_title}
                            </div>
                            <div
                                className={`grid gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-white overflow-hidden`}
                                style={{
                                    gridTemplateColumns: `repeat(${1 + displayedCompareProducts.length + (isButtonDisabled ? 0 : 1)}, minmax(0, 1fr))`,
                                }}
                            >
                                <div className="flex flex-col divide-y relative">
                                    <div
                                        className="py-5 line-clamp-1 whitespace-nowrap text-center">
                                        {option.value}
                                    </div>
                                </div>
                                {/* ستون محصولات مقایسه‌ای */}
                                {displayedCompareProducts.map((product2, i) => (
                                    <div key={i} className="flex flex-col divide-y relative">
                                        <div key={index}
                                             className="py-5 line-clamp-1 whitespace-nowrap text-center">
                                            {!product2.productOptions.data.find(
                                                (opt) => opt.option_item_id === product.productOptions.data[index].option_item_id
                                            )?.value?.trim() ? "---" :
                                                //@ts-ignore
                                                product2?.productOptions?.data?.find(
                                                    (opt) => opt?.option_item_id === product.productOptions.data[index]?.option_item_id
                                                ).value}
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
