"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaChartLine, FaSearch} from "react-icons/fa";
import {CubeIcon, LightBulbIcon} from "@heroicons/react/24/outline";

const TABS = [
    {title: "نمای کلی", link: "/admin/marketing", icon: <FaChartLine className="w-5 h-5"/>},
    {title: "محصولات", link: "/admin/marketing/products", icon: <CubeIcon className="w-5 h-5"/>},
    {title: "جستجوها", link: "/admin/marketing/searches", icon: <FaSearch className="w-5 h-5"/>},
    {title: "فرصت‌ها", link: "/admin/marketing/opportunities", icon: <LightBulbIcon className="w-5 h-5"/>},
];

export default function MarketingTab() {
    const pathname = usePathname();

    return (
        <div className="border-b border-gray-200 mx-2 bg-white">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
                {TABS.map((item) => (
                    <li className="me-2" key={item.link}>
                        <Link
                            href={item.link}
                            className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 gap-x-2 ${
                                pathname === item.link ? "border-primary-500 text-primary-600" : "border-transparent"
                            }`}
                        >
                            {item.icon}
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
