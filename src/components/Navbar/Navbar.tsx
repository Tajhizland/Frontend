import React, { useState } from 'react';
import logo from "@/images/tajhizland/logo.png"
import avatar from "@/images/avatars/Image-16.png"
import Image from "next/image";
import {BellAlertIcon} from "@heroicons/react/24/solid";
import Profile from "@/components/Navbar/Profile";
import Bell from "@/components/Navbar/Bell";
import Logo from "@/shared/Logo/Logo";
export default function Navbar({sidebarControl}:{sidebarControl:any}) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <div className={" w-32 md:w-48  h-full"}>
                            <Logo/>
                        </div>
                        <button
                            data-drawer-target="logo-sidebar"
                            data-drawer-toggle="logo-sidebar"
                            aria-controls="logo-sidebar"
                            type="button"
                            onClick={sidebarControl}
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-x-2 sm:gap-x-10 ">
                        <div>
                            <Bell/>
                        </div>
                        <div className="flex items-center ms-3">
                            <Profile/>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
}
