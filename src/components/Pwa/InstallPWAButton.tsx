import React, {useEffect, useState} from "react";
import usePWAInstallPrompt from "@/hooks/usePWAInstallPrompt";
import Image from "next/image";
import icon from "@/images/icon.png"
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export default function InstallPWAButton() {
    const {isInstallable, installPWA} = usePWAInstallPrompt();


    const [showNavigation, setShowNavigation] = useState(true);

    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY || window.scrollY < 10) {
                // اسکرول به پایین - منو را پنهان کن
                setShowNavigation(false);
            } else {
                // اسکرول به بالا - منو را نمایش بده
                setShowNavigation(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    if (!isInstallable || !showNavigation) return null;
    return (
        <div
            className="fixed top-16 right-0 w-full bg-white text-black px-2 py-1 rounded-lg shadow-md  flex md:hidden justify-between gap-2 z-50">
            <div className={"flex items-center gap-2"}>
                <Image className={"w-5 h-5"} src={icon} alt={"logo"}/>
                <p className={"text-sm"}>اپلیکیشن تجهیزلند</p>
            </div>
            <div className="flex gap-2">
                <ButtonSecondary
                    className="border border-slate-100 dark:border-slate-700 text-xs sm:text-sm"
                    onClick={installPWA}>
                    نصب
                </ButtonSecondary>
            </div>
        </div>
    );
}