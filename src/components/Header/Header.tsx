"use client";

import React from "react";
import {usePathname} from "next/navigation";
import {useThemeMode} from "@/hooks/useThemeMode";
import {QueryClient, QueryClientProvider} from "react-query";
import MainNav2Logged from "@/components/Header/MainNav2Logged";

const Header = () => {
    useThemeMode();

    let pathname = usePathname();
    const queryClient = new QueryClient();

    return (<>
        <QueryClientProvider client={queryClient}>
            <div className="nc-HeaderLogged sticky top-0 w-full z-40 ">
                <MainNav2Logged />
            </div>
        </QueryClientProvider>

    </>);
};

export default Header;
