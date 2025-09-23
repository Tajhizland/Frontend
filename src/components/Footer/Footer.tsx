//@ts-nocheck
import Logo from "@/shared/Logo/Logo";
import React, {ReactNode} from "react";
import {Route} from "next";
import Link from "next/link";
import {PiNewspaper, PiVideo} from "react-icons/pi";
import {IoLocationSharp} from "react-icons/io5";
import {SiAparat} from "react-icons/si";
import {FaInstagram, FaYoutube} from "react-icons/fa";
import {IoLogoWhatsapp} from "react-icons/io";
import Image from "next/image";
import posterTajhizland from "@/images/posterTajhizland.png"

export interface CustomLink {
    label: string;
    href: Route;
    targetBlank?: boolean;
}

export interface WidgetFooterMenu {
    id: string;
    title: string;
    link: string;
    icon: ReactNode;
    menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
    {
        id: "5",
        title: "تجهیزلند ولاگ",
        link: "/vlog",
        icon: <PiVideo className={"w-6 h-6"}/>,
        menus: [
            {href: "/page/aboutus" as Route, label: "درباره ما"},
            {href: "/faq" as Route, label: "سوالات متداول"},
            {href: "/page/rahnama" as Route, label: "راهنمای خرید"},
            {href: "/page/ghavanin" as Route, label: "قوانین سایت"},
            {href: "/page/raviyeersal" as Route, label: "رویه ارسال سفارشات"},
            {href: "/page/khadamatpasazfrosh" as Route, label: "خدمات پس از فروش"},
        ],
    },
    {
        id: "1",
        link: "/news",
        icon: <PiNewspaper className={"w-6 h-6"}/>,
        title: "تجهیزلند بلاگ",
        menus: [
            {href: "/page/tajhizrahandazi" as Route, label: "تجهیز و راه اندازی"},
            {href: "/page/mosshvereamozesh" as Route, label: "مشاوره و آموزش"},
            {href: "/page/zemanatesalat" as Route, label: "ضمانت اصالت کالا"},
            {href: "/page/ersal" as Route, label: "ارسال به سراسر کشور"},
            {href: "/page/hamkarifrosh" as Route, label: " همکاری با تولید و تامین کنندگان"},
            {href: "/contact" as Route, label: "تماس با ما"},
        ],
    },
];

const Footer: React.FC = () => {
    const latitude = 35.69589116711923;
    const longitude = 51.397654536591794;
    const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
        return (
            <div key={index} className="text-sm  md:border-l">
                <Link href={menu.link} className={"flex items-center gap-2  text-[#fcb415] justify-center"}>
                    {menu.icon}
                    <h2 className="font-semibold text-base text-center ">
                        {menu.title}
                    </h2>
                </Link>
                <ul className="mt-5 space-y-2 text-center">
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

    const handleOpenAndroidMaps = () => {
        const url = `intent://maps.google.com/maps?daddr=${latitude},${longitude}#Intent;scheme=https;package=com.google.android.apps.maps;end`;
        window.open(url, '_blank');
    };
    return (
        <div
            className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700  dark:bg-neutral-900">
            <div
                className="container grid  grid-cols-2 gap-y-10 md:grid-cols-4  ">
                <div
                    className="hidden md:grid grid-cols-4 gap-2 sm:gap-2 col-span-2 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col md:border-l justify-items-center">
                    <div className="col-span-2 md:col-span-1   justify-center items-center hidden sm:flex">
                        <Logo/>
                    </div>
                    <div className="col-span-2 hidden sm:flex items-center md:col-span-3">
                        <div
                            className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg: "/>
                        <span className="text-xs text-gray-600 dark:text-white text-center">
                            تجهیز لند، فروشگاه اینترنتی تجهیزات آشپزخانه صنعتی،رستوران،فست فود،کافی شاپ و...
                        </span>
                    </div>

                    <div className={"col-span-4 md:col-span-1  flex justify-center items-center gap-5"}>
                        <Link href={"https://www.aparat.com/tajhizland_shop"}>
                            <SiAparat className={"w-6 h-6"}/>
                        </Link>
                        <Link href={"https://www.instagram.com/tajhizland_com?igsh=MWljMndzcTM0c2QzZg=="}>
                            <FaInstagram className={"w-6 h-6"}/>
                        </Link>
                        <Link href={"https://youtube.com/@tajhizland1590?si=p2_1_MPtla-xpdhP"}>
                            <FaYoutube className={"w-6 h-6"}/>
                        </Link>
                        <Link href={"https://wa.me/989353077652"}>
                            <IoLogoWhatsapp className={"w-6 h-6"}/>
                        </Link>
                    </div>

                    <div className="col-span-4 sm:col-span-2 md:col-span-1">

                        <div className={"flex gap-2 items-center justify-center"}>
                            <div className={"border rounded-2xl p-4"}>
                                <a referrerPolicy='origin' target='_blank'
                                   href='https://trustseal.enamad.ir/?id=150491&Code=dHACISLBlXNOcdnB2JpZ'><img
                                    className={"w-[100px] h-[100px]"}
                                    referrerPolicy='origin'
                                    src='https://trustseal.enamad.ir/logo.aspx?id=150491&Code=dHACISLBlXNOcdnB2JpZ'
                                    alt=''
                                    code='dHACISLBlXNOcdnB2JpZ'/></a>
                            </div>
                            <div className={"border rounded-2xl p-4"}>
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

                </div>
                {widgetMenus.map(renderWidgetMenuItem)}
                <div className={"flex flex-col gap-2 mr-5 col-span-2 lg:col-span-1 items-start"}>
                    <Link href={"/branch"} className={"w-full"}>
                    <div className={"w-full rounded-2xl overflow-hidden"}>
                        <Image className={"object-contain"}
                               src={posterTajhizland}
                               alt={"تومان"}
                        />
                    </div>
                    </Link>
                    <div className={"flex items-start gap-1"}>
                        <IoLocationSharp className={"w-4 h-4"}/>
                        <strong>
                            آدرس فروشگاه حضوری :
                        </strong>
                    </div>
                    <p className={"text-sm"}>
                        تهران ، خیابان جمهوری ، بین خیابان دانشگاه و ابوریحان ، ضلع شمال خیابان جمهوری(لاین خط ویژه)
                        ،پلاک 981
                    </p>
                    <div className={"flex justify-between items-center w-full"}>
                        <strong className={"text-[#fcb415] cursor-pointer"} onClick={handleOpenAndroidMaps}>
                            مسیریابی آنلاین
                        </strong>
                        <a href={"tel:02166477790"} className={"font-bold text-lg"}>
                            ۰۲۱-۶۶۴۷۷۷۹۰
                        </a>
                    </div>
                    <div
                        className="grid md:hidden grid-cols-4 gap-2  col-span-2 lg:col-span-2  justify-items-center w-full">

                        <div className="col-span-4 sm:col-span-2 md:col-span-1">

                            <div className={"flex gap-2 items-center justify-center"}>
                                <div className={"border rounded-2xl p-4"}>
                                    <a referrerPolicy='origin' target='_blank'
                                       href='https://trustseal.enamad.ir/?id=150491&Code=dHACISLBlXNOcdnB2JpZ'><img
                                        className={"w-[100px] h-[100px]"}
                                        referrerPolicy='origin'
                                        src='https://trustseal.enamad.ir/logo.aspx?id=150491&Code=dHACISLBlXNOcdnB2JpZ'
                                        alt=''
                                        code='dHACISLBlXNOcdnB2JpZ'/></a>
                                </div>
                                <div className={"border rounded-2xl p-4"}>
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

                        <div className={"col-span-4 md:col-span-1  flex justify-center items-center gap-5"}>
                            <Link href={"https://www.aparat.com/tajhizland_shop"}>
                                <SiAparat className={"w-6 h-6"}/>
                            </Link>
                            <Link href={"https://www.instagram.com/tajhizland_com?igsh=MWljMndzcTM0c2QzZg=="}>
                                <FaInstagram className={"w-6 h-6"}/>
                            </Link>
                            <Link href={"https://youtube.com/@tajhizland1590?si=p2_1_MPtla-xpdhP"}>
                                <FaYoutube className={"w-6 h-6"}/>
                            </Link>
                            <Link href={"https://wa.me/989353077652"}>
                                <IoLogoWhatsapp className={"w-6 h-6"}/>
                            </Link>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;
