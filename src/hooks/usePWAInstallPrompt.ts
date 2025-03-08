"use client"

import { useEffect, useState } from "react";

export default function usePWAInstallPrompt() {
    const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault(); // جلوگیری از نمایش پیش‌فرض مرورگر
            setInstallPrompt(event);
            setIsInstallable(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const installPWA = () => {
        if (installPrompt) {
            (installPrompt as any).prompt();
        }
    };

    return { isInstallable, installPWA };
}