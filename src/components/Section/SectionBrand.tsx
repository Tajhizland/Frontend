"use client";

import React from "react";
import {BrandResponse} from "@/services/types/brand";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import NcImage from "@/shared/NcImage/NcImage";

const SectionBrand = ({data}: { data: BrandResponse[] }) => {

    return (
        <div className={"flex flex-col gap-5 items-center py-10"}>
            <h2 className={"text-2xl font-bold"}>انتخاب محصول بر اساس برند</h2>
            <div className="grid w-full grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {data.slice(0, 12).map((item, i) => (
                    <Link href={"/brand/" + item.url} title={item.name} key={i}>
                        <div className="aspect-square w-full rounded-2xl border border-neutral-200 bg-white p-3 sm:p-5 transition-shadow hover:shadow-md">
                            <NcImage
                                alt={item.name}
                                containerClassName="w-full h-full"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${item.image}`}
                                className="object-contain w-full h-full"
                                sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 17vw"
                                width={720}
                                height={720}
                            />
                        </div>
                    </Link>
                ))}
            </div>

            <ButtonPrimary href={"/brand"}>
                 مشاهده همه برند ها
            </ButtonPrimary>
        </div>
    );
};

export default SectionBrand;
