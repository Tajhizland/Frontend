"use client"
import Link from "next/link";
import { FaHome, FaNewspaper, FaUser} from "react-icons/fa";
import {BsSignStopFill} from "react-icons/bs";
import {useUser} from "@/services/globalState/GlobalState";

export default function BottomNavigation() {
    const [user] = useUser();

    return (<>


        <div
            className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 lg:hidden">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <Link
                    href={user?"/account-order-on-hold":"/login"}
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <BsSignStopFill className={"w-5 h-5 text-slate-600"}/>
                        <span className={"text-xs text-slate-600 font-bold whitespace-nowrap"}>
                          سفارشات معلق
                        </span>
                    </div>
                </Link>
                <Link
                    href={user?"/account":"/login"}
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <FaUser className={"w-5 h-5 text-slate-600"}/>
                        <span className={"text-xs text-slate-600 font-bold whitespace-nowrap"}>
                            حساب کاربری
                        </span>
                    </div>
                </Link>
                <Link
                    href={"/"}
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <FaHome className={"w-5 h-5 text-slate-600"}/>
                        <span className={"text-xs text-slate-600 font-bold whitespace-nowrap"}>
                           خانه
                        </span>
                    </div>
                </Link>

                <Link
                    href={"/news"}
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
                    <div className={"flex flex-col justify-center items-center gap-y-2"}>
                        <FaNewspaper className={"w-5 h-5 text-slate-600"}/>
                        <span className={"text-xs text-slate-600 font-bold whitespace-nowrap"}>
                             اخبار
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    </>)
}
