"use client";

import React from "react";
import {BrandResponse} from "@/services/types/brand";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import {Route} from "next";
import NcImage from "@/shared/NcImage/NcImage";

const SectionBrand = ({data}: { data: BrandResponse[] }) => {

    return (
        <div className={"flex flex-col gap-5 items-center py-10"}>
            <h2 className={"text-2xl font-bold"}>انتخاب محصول بر اساس برند</h2>
            <div className="grid  grid-cols-4 lg:grid-cols-6 gap-4">
                {data.slice(0, 12).map((item, i) => (
                    <Link href={"/brand/" + item.url as Route} title={item.name} key={i}>
                        <div className="aspect-square w-full">
                            <NcImage
                                alt={item.name}
                                containerClassName="w-full h-full"
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${item.image}`}
                                className="object-cover w-full h-full rounded-2xl"
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
