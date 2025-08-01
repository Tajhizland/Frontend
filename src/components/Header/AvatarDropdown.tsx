"use client";

import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import Link from "next/link";
import {useMutation, useQuery} from "react-query";
import {me} from "@/services/api/auth/me";
import {setUser, useUser} from "@/services/globalState/GlobalState";
import {deleteCookie, getCookie} from "cookies-next";
import {MdLogin} from "react-icons/md";
import {logout} from "@/services/api/auth/logout";
import {toast} from "react-hot-toast";
import SwitchDarkMode2 from "@/shared/SwitchDarkMode/SwitchDarkMode2";
import Image from "next/image";
import Avatar from "@/components/Avatar/Avatar";
import Prices from "@/components/Price/Prices";
import {FaEye} from "react-icons/fa";
import {TbBasketCheck, TbBasketExclamation} from "react-icons/tb";

export default function AvatarDropdown() {

    const [user] = useUser();
    const [showWallet, setShowWallet] = useState(true);

    const {data, isSuccess} = useQuery({
        queryKey: ['user'],
        queryFn: () => me(),
        staleTime: 5000,
        enabled: !!getCookie("token"),
        onSuccess: (user) => {
            setUser(user);
        },
        onError: () => {
            deleteCookie("token");
        }
    });


    const {
        mutateAsync: logoutHandle,
    } = useMutation({
        mutationKey: [`logout`],
        mutationFn: () =>
            logout(),
        onSuccess: data => {
            deleteCookie("token")
            toast.success(data.message as string)
            window.location.reload()
        }

    });


    useEffect(() => {
        const handleScroll = () => {
            const popover = document.querySelector('.AvatarDropdown');
            if (popover) {
                const popoverInstance = popover.querySelector('[data-headlessui-state="open"]');
                if (popoverInstance) {
                    const popoverButton = popover.querySelector('button');
                    if (popoverButton) popoverButton.click(); // بستن Popover
                }
            }
        };

        // اضافه کردن Listener
        window.addEventListener("scroll", handleScroll);

        // حذف Listener هنگام unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (isSuccess)
        return (
            <div className="AvatarDropdown z-50">
                <Popover className="relative">
                    {({open, close}) => (
                        <>
                            <PopoverButton
                                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
                            >
                                <Avatar profile={user?.avatar} className={"w-7 h-7"}/>
                                {/*<svg*/}
                                {/*    className=" w-6 h-6"*/}
                                {/*    viewBox="0 0 24 24"*/}
                                {/*    fill="none"*/}
                                {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                {/*>*/}
                                {/*    <path*/}
                                {/*        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"*/}
                                {/*        stroke="currentColor"*/}
                                {/*        strokeWidth="1.5"*/}
                                {/*        strokeLinecap="round"*/}
                                {/*        strokeLinejoin="round"*/}
                                {/*    />*/}
                                {/*    <path*/}
                                {/*        d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"*/}
                                {/*        stroke="currentColor"*/}
                                {/*        strokeWidth="1.5"*/}
                                {/*        strokeLinecap="round"*/}
                                {/*        strokeLinejoin="round"*/}
                                {/*    />*/}
                                {/*</svg>*/}
                            </PopoverButton>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <PopoverPanel
                                    className="absolute z-10 w-screen max-w-[260px] mt-3.5 -left-4 sm:left-0 sm:px-0">
                                    <div
                                        className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5">
                                        <div
                                            className="relative grid grid-cols-1 gap-3 bg-white dark:bg-neutral-800 py-7 px-6">
                                            <div className="flex items-center gap-x-3">
                                                <Avatar profile={user?.avatar}/>
                                                <div className="flex-grow">
                                                    <h4 className="font-semibold">{data?.name}</h4>
                                                    <p className="text-xs mt-0.5">{data?.username}</p>

                                                </div>

                                            </div>
                                            <div
                                                className={"flex justify-between items-center text-xs font-bold"}>
                                                <div className={"flex gap-1 items-center"}>
                                                    <Link href={"/account-wallet"}>
                                                        کیف پول
                                                    </Link>
                                                    <FaEye className={"cursor-pointer"} onClick={() => {
                                                        setShowWallet(!showWallet)
                                                    }}/>
                                                </div>
                                                {showWallet ?
                                                    <Prices price={data?.wallet ?? 0}/>
                                                    :
                                                    <div className={"py-1.5"}>
                                                        {
                                                            '*'.repeat(data?.wallet?.toString().length)
                                                        }

                                                    </div>
                                                }

                                            </div>
                                            <div
                                                className="w-full border-b border-neutral-200 dark:border-neutral-700"/>

                                            {/* ------------------ 1 --------------------- */}
                                            <Link
                                                href={"/account"}
                                                className="flex items-center p-2  -m-2 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                onClick={() => close()}
                                            >
                                                <div
                                                    className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M12.1601 10.87C12.0601 10.86 11.9401 10.86 11.8301 10.87C9.45006 10.79 7.56006 8.84 7.56006 6.44C7.56006 3.99 9.54006 2 12.0001 2C14.4501 2 16.4401 3.99 16.4401 6.44C16.4301 8.84 14.5401 10.79 12.1601 10.87Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M7.15997 14.56C4.73997 16.18 4.73997 18.82 7.15997 20.43C9.90997 22.27 14.42 22.27 17.17 20.43C19.59 18.81 19.59 16.17 17.17 14.56C14.43 12.73 9.91997 12.73 7.15997 14.56Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="mr-4">
                                                    <p className="text-sm font-medium ">{"حساب کاربری"}</p>
                                                </div>
                                            </Link>

                                            {/* ------------------ 2 --------------------- */}
                                            <Link
                                                href={"/account-order"}
                                                className="flex items-center p-2  -m-2 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                onClick={() => close()}
                                            >
                                                <div
                                                    className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                    <TbBasketCheck className={"w-6 h-6"} />
                                                </div>
                                                <div className="mr-4">
                                                    <p className="text-sm font-medium ">{"سفارش ها"}</p>
                                                </div>
                                            </Link>

                                            <Link
                                                href={"/account-order-on-hold"}
                                                className="flex items-center p-2  -m-2 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                onClick={() => close()}
                                            >
                                                <div
                                                    className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                    <TbBasketExclamation className={"w-6 h-6"} />
                                                </div>
                                                <div className="mr-4">
                                                    <p className="text-sm font-medium ">{"سفارش های معلق"}</p>
                                                </div>
                                            </Link>

                                            {/* ------------------ 2 --------------------- */}
                                            <Link
                                                href={"/account-savelists"}
                                                className="flex items-center p-2  -m-2 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                onClick={() => close()}
                                            >
                                                <div
                                                    className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                    >
                                                        <path
                                                            d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="mr-4">
                                                    <p className="text-sm font-medium ">{"لیست علاقه مندی"}</p>
                                                </div>
                                            </Link>

                                            <div
                                                className="w-full border-b border-neutral-200 dark:border-neutral-700"/>

                                            {/* ------------------ 2 --------------------- */}
                                            <div
                                                className="flex items-center justify-between p-2  -m-2 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                                                <div className="flex items-center">
                                                    <div
                                                        className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                        <svg
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M12.0001 7.88989L10.9301 9.74989C10.6901 10.1599 10.8901 10.4999 11.3601 10.4999H12.6301C13.1101 10.4999 13.3001 10.8399 13.0601 11.2499L12.0001 13.1099"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M8.30011 18.0399V16.8799C6.00011 15.4899 4.11011 12.7799 4.11011 9.89993C4.11011 4.94993 8.66011 1.06993 13.8001 2.18993C16.0601 2.68993 18.0401 4.18993 19.0701 6.25993C21.1601 10.4599 18.9601 14.9199 15.7301 16.8699V18.0299C15.7301 18.3199 15.8401 18.9899 14.7701 18.9899H9.26011C8.16011 18.9999 8.30011 18.5699 8.30011 18.0399Z"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                            <path
                                                                d="M8.5 22C10.79 21.35 13.21 21.35 15.5 22"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div className="mr-4">
                                                        <p className="text-sm font-medium ">{"حالت شب"}</p>
                                                    </div>
                                                </div>
                                                <SwitchDarkMode2/>
                                            </div>

                                            {/* ------------------ 2 --------------------- */}
                                            <Link
                                                href={"/"}
                                                className="flex items-center p-2  -m-2 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                onClick={() => close()}
                                            >
                                                <div
                                                    className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M11.97 22C17.4928 22 21.97 17.5228 21.97 12C21.97 6.47715 17.4928 2 11.97 2C6.44715 2 1.97 6.47715 1.97 12C1.97 17.5228 6.44715 22 11.97 22Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M4.89999 4.92993L8.43999 8.45993"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M4.89999 19.07L8.43999 15.54"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M19.05 19.07L15.51 15.54"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M19.05 4.92993L15.51 8.45993"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="mr-4">
                                                    <p className="text-sm font-medium ">{"سوالات متداول"}</p>
                                                </div>
                                            </Link>

                                            {/* ------------------ 2 --------------------- */}
                                            <div
                                                className="flex items-center p-2  -m-2 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                onClick={() => {
                                                    logoutHandle();
                                                    close()
                                                }}
                                            >
                                                <div
                                                    className="flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-300">
                                                    <svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M15 12H3.62"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                        <path
                                                            d="M5.85 8.6499L2.5 11.9999L5.85 15.3499"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </div>
                                                <div className="mr-4">
                                                    <p className="text-sm font-medium ">{"خروج"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverPanel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        );
    else
        return (<Link href={"/login"} aria-label={"login"}
                      className={`rounded bg-white flex whitespace-nowrap border px-1 sm:px-3 py-1 lg:py-2 lg:ml-4 text-slate-700 dark:text-white  hover:bg-slate-100 dark:hover:bg-slate-800 dark:bg-slate-900 focus:outline-none lg:flex items-center justify-center gap-x-1`}
        >
            <div>
                <MdLogin className={"w-3 h-3 sm:w-5 sm:h-5"}/>
            </div>
            <div>
                <span className={"text-[10px] sm:text-xs font-bold whitespace-nowrap"}>ورود | ثبت نام</span>
            </div>
        </Link>)
}
