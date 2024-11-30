"use client"
import Link from "next/link";
import { FaNewspaper, FaRegUser} from "react-icons/fa";
import {useUser} from "@/services/globalState/GlobalState";
import MenuBar from "@/shared/MenuBar/MenuBar";
import React from "react";
import {SlBasket} from "react-icons/sl";
import {HiOutlineHome} from "react-icons/hi";
import {MdOutlineOndemandVideo} from "react-icons/md";

export default function BottomNavigation() {
    const [user] = useUser();

    return (<>


        <div
            className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 lg:hidden dark:bg-neutral-900">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                <Link
                    href={"/"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <HiOutlineHome className={"w-5 h-5 text-neutral-500"}/>
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
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <SlBasket className={"w-5 h-5 text-neutral-500"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap dark:text-white"}>
                             سبد خرید
                        </span>
                    </div>
                </Link>
                <Link
                    href={"/vlog"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <MdOutlineOndemandVideo className={"w-5 h-5 text-neutral-500"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap dark:text-white"}>
                         ولاگ
                        </span>
                    </div>
                </Link>
                <Link
                    href={user ? "/account" : "/login"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <FaRegUser className={"w-5 h-5 text-neutral-500"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap dark:text-white"}>
                            حساب کاربری
                        </span>
                    </div>
                </Link>


                <Link
                    href={"/news"}
                    className="inline-flex flex-col items-center justify-center  hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <FaNewspaper className={"w-5 h-5 text-neutral-500"}/>
                        <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap"}>
                             اخبار
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    </>)
}
