"use client";

import React from "react";
import Image from "next/image";

type Props = {
    src?: string | null;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
};

const SearchPickerItem: React.FC<Props> = ({ src, title, subtitle }) => (
    <>
        {src && (
            <div className="w-[100px] h-[100px] relative shrink-0">
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${src}`}
                    alt="image"
                    fill
                    sizes="100px"
                    className="object-contain"
                />
            </div>
        )}
        <div className="flex flex-col gap-1 py-3 pe-3 text-end">
            <span className="font-medium">{title}</span>
            {subtitle && <span className="text-xs text-slate-500">{subtitle}</span>}
        </div>
    </>
);

export default SearchPickerItem;
