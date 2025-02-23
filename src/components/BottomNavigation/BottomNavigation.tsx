"use client"
import Link from "next/link";
import { FaNewspaper, FaRegUser} from "react-icons/fa";
import {useCart, useUser} from "@/services/globalState/GlobalState";
import React from "react";
import {SlBasket} from "react-icons/sl";
import {HiOutlineHome} from "react-icons/hi";
import {MdOutlineOndemandVideo} from "react-icons/md";
import MenuBar from "@/components/MenuBar/MenuBar";

export default function BottomNavigation() {
    const [user] = useUser();
    const [cart] = useCart();

    return (<>


        <div
            className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 lg:hidden dark:bg-neutral-900">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                <Link
                    href={"/"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <HiOutlineHome className={"w-5 h-5 text-[#fcb415]"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap dark:text-white"}>
                           خانه
                        </span>
                    </div>
                </Link>
                <div className={"flex flex-col justify-center items-center gap-y-2 cursor-pointer"}>
                    <MenuBar/>
                </div>
                <Link
                    href={"/cart"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2 relative"}>
                        <SlBasket className={"w-5 h-5 text-[#fcb415]"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap dark:text-white"}>
                             سبد خرید
                        </span>
                        <div
                            className="w-3.5 h-3.5 flex items-center justify-center bg-primary-500 absolute top-0 right-0 rounded-full text-[10px] leading-none text-white font-medium">
                            <span className="mt-[1px]">
                                {cart?.length ?? 0}
                            </span>
                        </div>
                    </div>
                </Link>
                <Link
                    href={"/vlog"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <MdOutlineOndemandVideo className={"w-5 h-5 text-[#fcb415]"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap dark:text-white"}>
                         ولاگ
                        </span>
                    </div>
                </Link>
                <Link
                    href={user ? "/account" : "/login"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <FaRegUser className={"w-5 h-5 text-[#fcb415]"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap dark:text-white"}>
                            حساب کاربری
                        </span>
                    </div>
                </Link>


                <Link
                    href={"/news"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <FaNewspaper className={"w-5 h-5 text-[#fcb415]"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap"}>
                             اخبار
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    </>)
}
