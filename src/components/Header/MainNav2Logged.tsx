"use client";

import React, {createRef, FC, useEffect, useRef, useState} from "react";
import Logo from "@/shared/Logo/Logo";
import AvatarDropdown from "./AvatarDropdown";
import CartDropdown from "./CartDropdown";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {usePathname, useRouter} from "next/navigation";
import {search} from "@/services/api/shop/search";
import Link from "next/link";
import {Route} from "next";
import Image from "next/image";
import {ProductResponse} from "@/services/types/product";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {FaBorderAll, FaExternalLinkAlt} from "react-icons/fa";
import {PiSmileySad} from "react-icons/pi";
import SearchBar from "@/components/Header/SearchBar";
import VlogLink from "@/components/Header/VlogLink";
import BlogLink from "@/components/Header/BlogLink";
import {MdOutlineOndemandVideo} from "react-icons/md";
import Input from "@/shared/Input/Input";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import Navigation from "@/components/Header/Navigation/Navigation";
import {FiChevronRight} from "react-icons/fi";

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
    const handleSearchVlog = () => {
        router.push("/vlog?search=" + inputRef.current?.value as Route);
    }
    const renderSearchForm = () => {
        return (
            <div className="relative w-full">
                <div
                    className="flex-1 py-2 text-slate-900 dark:text-slate-100"

                >
                    {/*<div*/}
                    {/*    className="bg-neutral-100 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded  ">*/}
                    {/*    <FaMagnifyingGlass className={"text-neutral-500 w-4 h-4"}/>*/}
                    {/*    <input*/}
                    {/*        onChange={searchHandle}*/}
                    {/*        ref={inputRef}*/}
                    {/*        type="text"*/}
                    {/*        placeholder="جستجو"*/}
                    {/*        className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm"*/}
                    {/*        autoFocus*/}
                    {/*    />*/}

                    {/*</div>*/}

                    <div className="relative w-full ">
                        <label
                            htmlFor="search-input"
                            className="text-neutral-500 dark:text-neutral-300"
                        >
                            <span className="sr-only">Search all icons</span>
                            <Input
                                className="border "
                                id="search-input"
                                onChange={searchHandle}
                                ref={inputRef}
                                type="text"
                                placeholder="جستجو"
                                sizeClass="pr-14 !py-2 pl-5 md:pr-16"
                                rounded="rounded-full"
                            />
                            <ButtonCircle
                                title={"icon"}
                                className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                                size=" w-8 h-8"
                                onClick={handleSearch}
                            >
                                <FiChevronRight className={"w-4 h-4"}/>
                            </ButtonCircle>
                            <span
                                onClick={handleSearch}
                                className="absolute cursor-pointer left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg
                    className="h-5 w-5"
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
              </span>
                        </label>
                    </div>
                </div>
                {searchResponse && showSearchForm &&
                    <div
                        ref={dropdownRef}
                        className="absolute top-14 left-0 w-full max-h-[496px] bg-white  dark:bg-neutral-900  z-50 border rounded shadow border-t-0 overflow-y-auto whitespace-nowrap ">
                        <button type="button" onClick={() => setShowSearchForm(false)}>
                            <XMarkIcon className="w-5 h-5 mr-5 dark:text-white"/>
                        </button>
                        <div className="flex flex-col   ">
                            {
                                searchResponse.length > 0 ? searchResponse.map((item) => (<>
                                        <Link href={"/product/" + item.url as Route}
                                              onChange={() => setSearchResponse(undefined)}>
                                            <div
                                                className="flex items-center justify-between  py-2 px-5 hover:bg-stone-100 dark:hover:bg-neutral-800 ">
                                                <div className="flex items-center gap-x-5  ">
                                                    <div className={""}>
                                                        <FaMagnifyingGlass className={" text-neutral-400"}/>
                                                    </div>
                                                    <div className={""}>
                                                        <Image alt="productImage"
                                                               src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.images.data[0].url}`}
                                                               width={50}
                                                               height={50}/>
                                                    </div>
                                                    <span
                                                        className={"text-sm text-neutral-800 font-bold dark:text-white "}> {item.name}  </span>
                                                </div>
                                                <div>
                                                    <FaExternalLinkAlt className={" text-neutral-400"}/>
                                                </div>
                                            </div>

                                        </Link>
                                    </>))
                                    :
                                    <div
                                        className="flex items-center gap-x-5 border-t p-5  justify-center  text-center "
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
                                className="flex items-center gap-x-5 border-t p-5 bg-stone-100 dark:bg-slate-900 dark:hover:bg-slate-800  hover:bg-stone-200 text-center cursor-pointer"
                                onClick={handleSearch}>
                                <div>
                                    <FaBorderAll className={"text-neutral-500 dark:text-white"}/>
                                </div>
                                <span className={"text-sm text-neutral-800 font-bold dark:text-white"}>
                                    مشاهده همه
                                </span>
                            </div>}
                            <div
                                className="flex items-center gap-x-5 border-t p-5 bg-stone-100 dark:bg-slate-900 dark:hover:bg-slate-800  hover:bg-stone-200 text-center cursor-pointer"
                                onClick={handleSearchVlog}>
                                <div>
                                    <MdOutlineOndemandVideo className={"text-neutral-500 dark:text-white"}/>
                                </div>
                                <span className={"text-sm text-neutral-800 font-bold dark:text-white"}>
                                    جستجو در ولاگ
                                </span>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div>
                <div className="h-16 lg:h-20 flex justify-between items-center gap-x-1">
                    {/*<div className="flex items-center lg:hidden flex-1">*/}
                    {/*    <MenuBar/>*/}
                    {/*</div>*/}

                    {/*<div className=" flex-1  flex items-center flex-col justify-center lg:gap-1 !flex-shrink-0  ml-1">*/}
                    {/*    <Logo className="!flex-shrink-0"/>*/}
                    {/*    <small*/}
                    {/*        className="text-slate-600 dark:text-slate-100 lg:text-xs sm:text-[8px] text-[6px]  block whitespace-nowrap">*/}
                    {/*        مرکز تخصصی تجهیزات کافه و رستوران*/}
                    {/*    </small>*/}
                    {/*</div>*/}
                    <div className={"w-full ml-1 flex-1  flex flex-col gap-1"}>
                        <Logo/>
                        <small
                            className="text-slate-600 dark:text-slate-100 lg:text-[13px] sm:text-[8px] text-[6px] hidden lg:block whitespace-nowrap">
                            مرکز تخصصی تجهیزات کافه و رستوران
                        </small>
                    </div>

                    <div className="lg:flex-[2] hidden lg:flex items-center justify-center mx-4">
                        {renderSearchForm()}
                    </div>
                    {/*<div className="lg:hidden flex items-center justify-center ml-1 w-64">*/}
                    {/*<Logo className="flex-shrink-0  w-full" imageClassName={"!w-full"} />*/}
                    {/*</div>*/}

                    <div className="lg:hidden flex items-center justify-center ml-1 w-full flex-[2]">
                        <SearchBar/>
                    </div>

                    <div className="lg:flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100 gap-x-1">
                        {/* {!showSearchForm && (
                            <button
                                aria-label={"search"}
                                className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                                onClick={() => setShowSearchForm(!showSearchForm)}
                            >
                                {renderMagnifyingGlassIcon()}
                            </button>
                        )} */}
                        <div className={"hidden lg:block"}>
                            <VlogLink/>
                        </div>
                        <div className={"hidden lg:block"}>
                            <BlogLink/>
                        </div>
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
            <div className="container sm:container z-50 ">{renderContent()}</div>
            {/* z-index بالا برای محتوا */}
            <div className="  relative z-40 hidden lg:block">
                <div
                    className={`bg-neutral-100   dark:bg-neutral-800 border-b border-slate-100 dark:border-slate-700 flex justify-center transition-all duration-300 ease-in-out absolute left-0 right-0 h-10 ${showNavigation ? 'translate-y-0 block' : '-translate-y-full hidden'
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
