"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { footprint } from "@/services/api/shop/footprint";
import { useUser } from "@/services/globalState/GlobalState";
import { useApiMutation } from "@/hooks/useApiMutation";

export default function Footprint() {
    const pathname = usePathname();
    const [user] = useUser();

    const trackMutation = useApiMutation(
        (path: string) => footprint({ path, user_id: user?.id ?? null }),
        { silent: true }
    );

    useEffect(() => {
        trackMutation.mutate(pathname);
    }, [pathname]);

    return null;
}
