"use client"
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {footprint} from "@/services/api/shop/footprint";
import {useUser} from "@/services/globalState/GlobalState";

export default function Footprint() {
    const pathname = usePathname();
    const [user] = useUser();

    useEffect(() => {
        footprint({
            path: pathname,
            user_id: user?.id ?? null
        })
    }, [pathname]);

    return <></>
}
