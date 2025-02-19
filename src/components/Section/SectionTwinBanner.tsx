import {BannerResponse} from "@/services/types/banner";
import Link from "next/link";
import {Route} from "next";
import Image from "next/image";
import React from "react";

export default function SectionTwinBanner({banners}:{banners:BannerResponse[]})
{
    return(<div className={"grid grid-cols-1 md:grid-cols-2 gap-5"}>

        {
            banners.map((item, index) => ( <div key={index}
                                                               className={`relative w-full aspect-w-5 aspect-h-2 rounded-2xl overflow-hidden group border`}>
                <Link key={index} href={item.url as Route} title={"link"}>
                    <Image
                        alt=""
                        fill
                        className="w-full h-full object-cover"
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banner/${item.image}`}
                    />
                </Link>
            </div>))
        }
    </div>)
}
