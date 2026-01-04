import {FaHeadphones} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import LogoIco from "@/images/tajhizlandTransparent.png";
import React from "react";

export default function CastLinkSection()
{
    return(<Link href={"/tajhizcast"} className={"flex items-center justify-between bg-[#00c38b] rounded-full px-4 gap-2"}>
        <div className={"flex items-center gap-2"}>
            <FaHeadphones />
            <strong className={"text-sm sm:text-base"}>ورود به صفحه تجهیزکست</strong>
        </div>
        <div className={"w-16 h-16 bg-white flex items-center rounded-full"}>
            <div
                className={`ttnc-logo inline-block text-slate-600  aspect-h-1 aspect-w-1 sm:aspect-w-1 w-full h-0 `}
            >
                <Image
                    className={`   h-full w-full  `}
                    src={LogoIco}
                    alt="Logo"
                    priority
                />
            </div>
        </div>
    </Link>)
}