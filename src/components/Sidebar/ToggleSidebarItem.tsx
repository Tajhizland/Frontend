import React, {useState} from "react";
import {MENU_ITEM_INTERFACE} from "@/components/Sidebar/MenuItem";
import SimpleSidebarItem from "@/components/Sidebar/SimpleSidebarItem";

export default function ToggleSidebarItem({menuItem}: { menuItem: MENU_ITEM_INTERFACE }) {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const toggleDropdown = (e: any): void => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };
    return (<>
        <li>
            <button
                type="button"
                className="flex items-center w-full p-2 py-4 text-base text-white transition duration-75   group hover:bg-slate-800  bg-slate-900"
                aria-controls="dropdown-example"
                onClick={toggleDropdown}
            >
                {menuItem.icon}

                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                {menuItem.title}
              </span>
                <svg
                    className={`w-3 h-3 transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            <ul
                id="dropdown-example"
                className={`${isOpen ? "block" : "hidden"} bg-slate-900`}
            >
                {
                    menuItem.sub?.map((item: MENU_ITEM_INTERFACE) => (<>
                        {
                            (item.sub) ? <>
                                    <ToggleSidebarItem menuItem={item}/>
                                </> :
                                <SimpleSidebarItem item={item}/>

                        }
                    </>))
                }

            </ul>
        </li>
    </>)
}
