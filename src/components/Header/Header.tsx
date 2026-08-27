"use client";

import React from "react";
import {usePathname} from "next/navigation";
import {useThemeMode} from "@/hooks/useThemeMode";
import MainNav2Logged from "@/components/Header/MainNav2Logged";
import InstallPWAButton from "@/components/Pwa/InstallPWAButton";

const Header = () => {
    useThemeMode();

    let pathname = usePathname();

    return (<>
            <div className="nc-HeaderLogged sticky top-0 w-full z-40 ">
                <MainNav2Logged />
                <InstallPWAButton />
            </div>

    </>);
};

export default Header;
