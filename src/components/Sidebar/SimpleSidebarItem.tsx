import React from "react";
 import Link from "next/link";
import {MENU_ITEM_INTERFACE} from "@/components/Sidebar/MenuItem";

export  default  function SimpleSidebarItem({item}:{item:MENU_ITEM_INTERFACE})
{
    return(<>
        <li>
            <Link
                href={"/admin/"+item.url}
                className="flex items-center w-full p-2 py-4  transition duration-75 rounded-lg   group hover:bg-slate-800  bg-slate-900 text-white "
            >
                <span className={"font-bold mx-4 text-white"}>
                {item.icon}
                    </span>
                {item.title}
            </Link>
        </li>
    </>)
}
