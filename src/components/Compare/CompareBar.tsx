"use client";

import React from "react";
import Image from "next/image";
import { ProductResponse } from "@/services/types/product";

type Props = {
    items: ProductResponse[];
    onOpen: () => void;
    onClear: () => void;
};

const CompareBar: React.FC<Props> = ({ items, onOpen, onClear }) => {
    if (!items.length) return null;

    return (
        <div className="rounded-2xl overflow-hidden whitespace-nowrap fixed z-50 md:right-1/2 md:translate-x-1/2 border bottom-[70px] right-2 sm:right-1/2 sm:translate-x-1/2 w-fit bg-white bg-opacity-80 p-1 sm:p-3 shadow-lg">
            <div className="flex gap-2 sm:gap-4 relative">
                <div
                    onClick={onOpen}
                    className="flex flex-col gap-1 rounded-r-2xl flex-shrink-0 justify-center items-center text-black shadow-xl bg-[#fcb415] w-16 sm:w-20 h-16 sm:h-20 font-bold text-xs sm:text-sm cursor-pointer hover:bg-opacity-80 text-center"
                >
                    مقایسه
                    <br />
                    {items.length > 1 ? items.length : ""} کالا
                </div>

                {items.map((item) => (
                    <div
                        key={item.id}
                        className="relative w-16 sm:w-20 bg-slate-50 dark:bg-slate-300 overflow-hidden z-1 group border"
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item?.images?.[0]?.url}`}
                            className="object-cover w-full h-full drop-shadow-xl flex"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                            alt="product"
                        />
                    </div>
                ))}

                <div className="flex justify-center items-center">
                    <div
                        onClick={onClear}
                        className="flex items-center justify-center cursor-pointer rounded-full bg-red-500 text-white font-bold w-4 h-4"
                    >
                        x
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompareBar;
