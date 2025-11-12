import {BannerResponse} from "@/services/types/banner";
import Link from "next/link";
import {Route} from "next";
import Image from "next/image";
import React from "react";

export default function SectionSingleBanner({banner, w = "aspect-w-2 sm:aspect-w-3 lg:aspect-w-4", h = "aspect-h-1"}: {
    banner: BannerResponse,
    w?: string,
    h?: string
}) {
    return (
        <div
            className={`relative w-full   rounded-2xl overflow-hidden group border ${w} ${h}`}
        >
            <Link href={banner.url as Route} title={"link"}>
                <Image
                    alt=""
                    fill
                    className="w-full h-full object-cover"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banner/${banner.image}`}
                />
            </Link>

        </div>
    )
}
