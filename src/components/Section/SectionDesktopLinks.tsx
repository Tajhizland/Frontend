import Link from "next/link";
import {Route} from "next";
import Image, {StaticImageData} from "next/image";
import React from "react";
import desktopStock from "@/images/desktopStock.png";
import desktopVlog from "@/images/desktopVlog.png";
import desktopCast from "@/images/desktopCast.png";
import desktopBlog from "@/images/desktopBlog.png";
import desktopStart from "@/images/desktopStart.png";
import desktopBrand from "@/images/desktopBrand.png";

type DesktopLinkItem = {
    title: string;
    image: StaticImageData;
    href: Route;
    hideOnMobile?: boolean;
};

const DEFAULT_ITEMS: DesktopLinkItem[] = [
    {title: "کارکرده", image: desktopStock, href: "/product/stock" as Route},
    {title: "ولاگ", image: desktopVlog, href: "/vlog" as Route},
    {title: "تجهیزکست", image: desktopCast, href: "/tajhizcast" as Route},
    {title: "بلاگ", image: desktopBlog, href: "/news" as Route},
    {title: "راه اندازی", image: desktopStart, href: "/sample" as Route},
    {title: "برند ها", image: desktopBrand, href: "/brand" as Route, hideOnMobile: true},
];

export default function SectionDesktopLinks({className = "", items = DEFAULT_ITEMS}: {
    className?: string;
    items?: DesktopLinkItem[];
}) {
    return (
        <div className={`flex py-7 items-center justify-center gap-2 sm:gap-10 ${className}`}>
            {items.map((item, index) => (
                <Link
                    key={index}
                    href={item.href}
                    title={item.title}
                    className={`group flex flex-col items-center gap-2 ${item.hideOnMobile ? "hidden md:flex" : ""}`}
                >
                    <div
                        className={"relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden   transition-transform duration-300 group-hover:-translate-y-1"}>
                        <Image
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 16vw"
                            className={"w-full h-full object-cover"}
                            src={item.image}
                        />
                    </div>
                    <strong className={"text-xs sm:text-base text-center"}>{item.title}</strong>
                </Link>
            ))}
        </div>
    );
}
