import React, {useEffect, useState} from "react";
import usePWAInstallPrompt from "@/hooks/usePWAInstallPrompt";
import Image from "next/image";
import icon from "@/images/icon2.png"
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export default function InstallPWAButton() {
    const {isInstallable, installPWA} = usePWAInstallPrompt();


    const [showNavigation, setShowNavigation] = useState(false);

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

    if (
        !isInstallable ||
        !showNavigation || window.scrollY < 10) return null;
    return (
        <div className={"relative"}>

        <div
            className={`w-full bg-slate-800 text-white px-5 py-2  flex md:hidden justify-between items-center gap-2 z-50 absolute top-0 left-0`}>
            <div className={"flex items-center gap-2"}>
                <Image className={"w-8 h-8"} src={icon} alt={"logo"}/>
                <div className={"flex flex-col gap-0.5"}>
                    <p className={"text-sm font-bold"}>اپلیکیشن تجهیزلند</p>
                    <small className={"text-xs"}>خریدی هوشمنمدانه با تجربه ای بهتر ...</small>
                </div>
            </div>
            <div className="flex gap-2">
                <ButtonSecondary
                    className="border border-slate-100 dark:border-slate-700 text-xs sm:text-sm !h-fit !py-1"
                    onClick={installPWA}>
                    دانلود
                </ButtonSecondary>
            </div>
        </div>
        </div>
    );
}