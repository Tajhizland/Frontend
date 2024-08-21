"use client"
import Image from "next/image";
import avatar from "@/images/avatars/Image-16.png";
import {useState} from "react";
import {BellAlertIcon} from "@heroicons/react/24/solid";
import {Alert} from "@/shared/Alert/Alert";

export  default  function Bell()
{
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    return(<>
        <div className={"relative"}>
        <div>
            <button
                type="button"
                className="flex whitespace-nowrap overflow-hidden text-sm   rounded-full focus:ring-2 ring-offset-4 focus:ring-gray-300  "
                aria-expanded="false"
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                <BellAlertIcon className="h-6 w-6 text-slate-900 animate-pulse"/>
            </button>
        </div>
        {isDropdownOpen && (
            <div
                className="z-50 border   absolute left-0 top-5 mt-2 w-60 max:h-80 overflow-y-auto  bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown-user"
            >

                <ul className="py-1 divide-y" role="none">
                    <li>
                        <Alert type={"error"}>
                            سفارش جدید ثبت شد
                        </Alert>
                    </li>
                    <li>
                        <Alert type={"success"}>
                            سفارش جدید ثبت شد
                        </Alert>
                    </li>
                    <li>
                        <Alert type={"success"}>
                            سفارش جدید ثبت شد
                        </Alert>
                    </li>
                    <li>
                        <Alert type={"success"}>
                            سفارش جدید ثبت شد
                        </Alert>
                    </li>

                </ul>
            </div>
        )}
        </div>
    </>)
}
