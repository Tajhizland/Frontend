"use client";

import { useEffect } from "react";
import { chatInfo } from "@/services/api/auth/me";
import { useUser } from "@/services/globalState/GlobalState";
import { useApiMutation } from "@/hooks/useApiMutation";

export default function GoftinoContainer() {
    const [user] = useUser();

    const syncMutation = useApiMutation((token: string) => chatInfo({ token }), {
        silent: true,
        onSuccess: (response) => {
            if (!user) return;
            Goftino.setUserId((response as {token: string}).token);
            Goftino.setUser({
                name: `${user.name} ${user.last_name}`,
                email: user.email,
                about: user.national_code,
                phone: user.username,
                forceUpdate: true,
            });
        },
    });

    useEffect(() => {
        const onReady = () => {
            const token = Goftino.getUserId();
            if (!token || !user) return;
            syncMutation.mutate(token);
        };

        window.addEventListener("goftino_ready", onReady);
        return () => window.removeEventListener("goftino_ready", onReady);
    }, [user]);

    return null;
}
