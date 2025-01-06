"use client";

import React from "react";
import {usePathname} from "next/navigation";
import HeaderLogged from "@/components/Header/HeaderLogged";
import {useThemeMode} from "@/hooks/useThemeMode";
import {QueryClient, QueryClientProvider} from "react-query";

const SiteHeader = () => {
    useThemeMode();

    let pathname = usePathname();
    const queryClient = new QueryClient();

    return (<>
        <QueryClientProvider client={queryClient}>
            <HeaderLogged/>
        </QueryClientProvider>

    </>);
};

export default SiteHeader;
