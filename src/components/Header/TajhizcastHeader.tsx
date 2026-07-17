"use client";

import React, {createRef, FC, useEffect, useRef, useState} from "react";
import Logo from "@/shared/Logo/Logo";
import LogoIco from "@/images/logoTajhizcast.jpg";
import AvatarDropdown from "./AvatarDropdown";
import {usePathname, useRouter} from "next/navigation";
import {HeaderSearchResponse} from "@/services/types/serach";

export interface MainNav2LoggedProps {
}

const TajhizcastHeader: FC<MainNav2LoggedProps> = () => {
    const inputRef = createRef<HTMLInputElement>();
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [searchResponse, setSearchResponse] = useState<HeaderSearchResponse>()
    const pathname = usePathname();
    const router = useRouter();

    const [showNavigation, setShowNavigation] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowSearchForm(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setShowSearchForm(false);
        setSearchResponse(undefined)
    }, [pathname])



    const renderContent = () => {
        return (
            <div>
                <div className="h-16 lg:h-20 flex justify-between items-center gap-x-1">
                    <div className={"w-full ml-1 flex-1  flex flex-col gap-1"}>
                        <Logo/>
                        <small
                            className="text-slate-600 dark:text-slate-100 lg:text-[13px] sm:text-[8px] text-[6px] hidden lg:block whitespace-nowrap">
                         </small>
                    </div>


                    <div className="lg:flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100 gap-x-1">

                        <AvatarDropdown/>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div
            className="nc-MainNav2Logged relative z-40 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
            <div className="container sm:container z-50 ">{renderContent()}</div>
        </div>
    );

};

export default TajhizcastHeader;
