"use client";

import React, {createRef, FC, useEffect, useState} from "react";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {usePathname, useRouter} from "next/navigation";
import {search} from "@/services/api/shop/search";
import {SearchResponse} from "@/services/types/serach";
import Link from "next/link";
import {Route} from "next";
import Image from "next/image";
import {ProductResponse} from "@/services/types/product";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {FaBorderAll, FaExternalLinkAlt} from "react-icons/fa";
import {PiSmileySad} from "react-icons/pi";

export interface MainNav2LoggedProps {
}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
    const inputRef = createRef<HTMLInputElement>();
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [searchResponse, setSearchResponse] = useState<ProductResponse[]>()
    const pathname = usePathname();
    const router = useRouter();

    const [showNavigation, setShowNavigation] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
        setShowSearchForm(false);
        setSearchResponse(undefined)
    }, [pathname])

    async function searchHandle(e: any) {
        if (e.target.value == "") {
            setShowSearchForm(false);
            return;
        }
        let response = await search({query: e.target.value});
        if (response.data) {
            setSearchResponse(response.data);
            setShowSearchForm(true);
        } else
            setSearchResponse(undefined)
    }

    const handleSearch = () => {
        router.push("/search/" + inputRef.current?.value as Route);
    }
    const renderMagnifyingGlassIcon = () => {
        return (
            <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    };

    const renderSearchForm = () => {
        return (
            <div className="relative w-full">
                <div
                    className="flex-1 py-2 text-slate-900 dark:text-slate-100"

                >
                    <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
                        {renderMagnifyingGlassIcon()}
                        <input
                            onChange={searchHandle}
                            ref={inputRef}
                            type="text"
                            placeholder="جستجو"
                            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm"
                            autoFocus
                        />
                        <button type="button" onClick={() => setShowSearchForm(false)}>
                            <XMarkIcon className="w-5 h-5"/>
                        </button>
                    </div>
                    <input type="submit" hidden value=""/>
                </div>
                {searchResponse && showSearchForm &&
                    <div
                        className="absolute top-14 left-0 w-full h-96 bg-white  z-50 border rounded shadow border-t-0 overflow-y-scroll whitespace-nowrap ">
                        <div className="flex flex-col  ">
                            {
                                searchResponse.length > 0 ? searchResponse.map((item) => (<>
                                        <Link href={"/product/" + item.url as Route}
                                              onChange={() => setSearchResponse(undefined)}>
                                            <div
                                                className="flex items-center justify-between  py-5 px-5 hover:bg-stone-100 ">
                                                <div className="flex items-center gap-x-5  ">
                                                    <div className={""}>
                                                        <FaMagnifyingGlass className={" text-neutral-400"}/>
                                                    </div>
                                                    <span
                                                        className={"text-sm text-neutral-800 font-bold "}> {item.name}  </span>
                                                </div>
                                                <div>
                                                    <FaExternalLinkAlt className={" text-neutral-400"}/>
                                                </div>
                                            </div>

                                        </Link>
                                    </>))
                                    :
                                    <div
                                        className="flex items-center gap-x-5 border-t p-5 bg-stone-100  text-center "
                                        onClick={handleSearch}>
                                        <div>
                                            <PiSmileySad className={"text-neutral-500"}/>
                                        </div>
                                        <span className={"text-sm text-neutral-800 font-bold"}>
                                   موردی یافت نشد !
                                    </span>
                                    </div>
                            }
                            {searchResponse.length > 0 && <div
                                className="flex items-center gap-x-5 border-t p-5 bg-stone-100 hover:bg-stone-200 text-center cursor-pointer"
                                onClick={handleSearch}>
                                <div>
                                    <FaBorderAll className={"text-neutral-500"}/>
                                </div>
                                <span className={"text-sm text-neutral-800 font-bold"}>
                                مشاهده همه
                                    </span>
                            </div>}
                        </div>
                    </div>}
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div>
                <div className="h-20 flex justify-between">
                    <div className="flex items-center lg:hidden flex-1">
                        <MenuBar/>
                    </div>

                    <div className="lg:flex-1 flex items-center">
                        <Logo className="flex-shrink-0"/>
                    </div>

                    <div className="flex-[2] hidden lg:flex items-center justify-center mx-4">
                        {renderSearchForm()}
                    </div>

                    <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
                        {/* {!showSearchForm && (
                            <button
                                aria-label={"search"}
                                className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                                onClick={() => setShowSearchForm(!showSearchForm)}
                            >
                                {renderMagnifyingGlassIcon()}
                            </button>
                        )} */}
                        <AvatarDropdown/>
                        <CartDropdown/>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div
            className="nc-MainNav2Logged relative z-40 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
            <div className="container z-50">{renderContent()}</div>
            {/* z-index بالا برای محتوا */}
            <div className="relative z-40 hidden lg:block">
                <div
                    className={`bg-stone-50 flex justify-center transition-all duration-300 ease-in-out absolute left-0 right-0 h-10 ${showNavigation ? 'translate-y-0 block' : '-translate-y-full hidden'
                    }`}
                    style={{top: '100%'}}
                >
                    <Navigation/>
                </div>
            </div>
        </div>
    );

};

export default MainNav2Logged;
