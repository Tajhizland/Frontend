"use client"
import Image from "next/image";
import avatar from "@/images/avatars/Image-16.png";
import {useState} from "react";

export  default  function Profile()
{
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
    return(<>
        <div>
            <button
                type="button"
                className="flex whitespace-nowrap overflow-hidden text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                onClick={toggleDropdown}
            >
                <span className="sr-only">Open user menu</span>
                <Image src={avatar} alt={"avatar"} sizes={"responsive"} width={35} height={35}/>
            </button>
        </div>
        {isDropdownOpen && (
            <div
                className="z-50 absolute left-0 top-12 mt-2 w-48 bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown-user"
            >
                <div className="px-4 py-3" role="none">
                    <p
                        className="text-sm text-gray-900 dark:text-white"
                        role="none"
                    >
                        مهران سبحانی
                    </p>
                    <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                    >
                        09194961416
                    </p>
                </div>
                <ul className="py-1" role="none">
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                        >
                            ویرایش پروفایل
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                        >
                            تغییر کلمه عبور
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                            role="menuitem"
                        >
                            خروج
                        </a>
                    </li>

                </ul>
            </div>
        )}
        </>)
}
