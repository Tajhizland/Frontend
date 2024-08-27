import React from "react";
 import Link from "next/link";
import {MENU_ITEM_INTERFACE} from "@/components/Sidebar/MenuItem";

export  default  function SimpleSidebarItem({item}:{item:MENU_ITEM_INTERFACE})
{
    return(<>
        <li>
            <Link
                href={{ pathname: "/admin/" + item.url }}
                className="text-xs flex items-center w-full p-2 py-4  transition duration-75 rounded-lg   group hover:bg-slate-800  bg-transparent text-white "
            >
                <span className={"font-bold  text-white ml-3"}>
                {item.icon}
                    </span>
                {item.title}
            </Link>
        </li>
    </>)
}
