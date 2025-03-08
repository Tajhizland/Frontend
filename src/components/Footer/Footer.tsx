import Logo from "@/shared/Logo/Logo";
import React from "react";
import {Route} from "next";
import Link from "next/link";
import Image from "next/image";

export interface CustomLink {
    label: string;
    href: Route;
    targetBlank?: boolean;
}

export interface WidgetFooterMenu {
    id: string;
    title: string;
    menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
    {
        id: "5",
        title: " اطلاعات ",
        menus: [
            {href: "/page/rahnama" as Route, label: "راهنمای خرید"},
            {href: "/page/faq" as Route, label: "سوالات متداول"},
            {href: "/page/aboutus" as Route, label: "درباره ما"},
            {href: "/page/ghavanin" as Route, label: "قوانین سایت"},
            {href: "/page/rule" as Route, label: "قوانین ثبت سفارش"},
            {href: "/page/raviyeersal" as Route, label: "رویه ارسال سفارشات"},
            {href: "/page/hamkarifrosh" as Route, label: " همکاری با تولید و تامین کنندگان"},

        ],
    },
    {
        id: "1",
        title: "خدمات تجهیزلند",
        menus: [
            {href: "/", label: "فروشگاه اینترنتی"},
            {href: "/page/tajhizrahandazi" as Route, label: "تجهیز و راه اندازی"},
            {href: "/page/mosshvereamozesh" as Route, label: "مشاوره و آموزش"},
            {href: "/page/zemanatesalat" as Route, label: "ضمانت اصالت کالا"},
            {href: "/page/ersal" as Route, label: "ارسال به سراسر کشور"},
            {href: "/page/khadamatpasazfrosh" as Route, label: "خدمات پس از فروش"},


        ],
    },
    {
        id: "2",
        title: "دسترسی سریع",
        menus: [
            {href: "/news" as Route, label: "مقالات"},
            {href: "/vlog" as Route, label: "ولاگ"},
            {href: "/product/discounted" as Route, label: "تخفیفی های تجهیزلند"},
            {href: "/special" as Route, label: "محصولات خاص پسند ها"},
            {href: "/brand" as Route, label: "برند ها"},
            {href: "/contact" as Route, label: "تماس با ما"},

        ],
    }
];

const Footer: React.FC = () => {
    const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
        return (
            <div key={index} className="text-sm">
                <h2 className="font-semibold text-neutral-700 dark:text-neutral-200 text-base">
                    {menu.title}
                </h2>
                <ul className="mt-5 space-y-4">
                    {menu.menus.map((item, index) => (
                        <li key={index}>
                            <a
                                key={index}
                                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div
            className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700  dark:bg-neutral-900">
            <div
                className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-4 lg:gap-x-10 ">
                <div className="grid grid-cols-4 gap-5 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
                    <div className="col-span-2 md:col-span-1">
                        <Logo/>
                    </div>
                    <div className="col-span-2 flex items-center md:col-span-3">
                        <div
                            className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start"/>
                        <span className="text-xs text-gray-600">
              تجهیز لند، فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...
            </span>
                    </div>
                    <div className="col-span-2 md:col-span-1">

                        <div className={"flex gap-2 items-center"}>
                            <Link href={"https://trustseal.enamad.ir/?id=150491&amp;Code=dHACISLBlXNOcdnB2JpZ"}
                                  referrerPolicy={"origin"} target={"_blank"}>
                                <img
                                    className={"w-[100px] h-[100px]"}
                                    referrerPolicy={"origin"}
                                    id={"dHACISLBlXNOcdnB2JpZ"}
                                    src={"https://Trustseal.eNamad.ir/logo.aspx?id=150491&amp;Code=dHACISLBlXNOcdnB2JpZ"}
                                    alt={"enamad"}
                                />
                            </Link>
                            <img
                                className={"w-[100px] h-[100px]"}
                                referrerPolicy={"origin"}
                                id={"rgvjjxlzsizprgvjnbqejzpe"}
                                src={"https://logo.samandehi.ir/logo.aspx?id=319327&p=qftinbpdbsiyqftiodrfyndt"}
                                alt={"samandehi"}
                            />
                        </div>
                    </div>

                </div>
                {widgetMenus.map(renderWidgetMenuItem)}
            </div>
        </div>
    );
};

export default Footer;
