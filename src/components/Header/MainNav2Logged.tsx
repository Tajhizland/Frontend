"use client";

import React, { createRef, FC, useEffect, useState } from "react";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/shared/Navigation/Navigation";
import CartDropdown from "./CartDropdown";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { search } from "@/services/api/shop/search";
import { SearchResponse } from "@/services/types/serach";
import Link from "next/link";
import { Route } from "next";
import Image from "next/image";
import { ProductResponse } from "@/services/types/product";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export interface MainNav2LoggedProps {
}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
    const inputRef = createRef<HTMLInputElement>();
    const [showSearchForm, setShowSearchForm] = useState(false);
    const [searchResponse, setSearchResponse] = useState<ProductResponse[]>()
    const pathname = usePathname();

    useEffect(() => {
        setShowSearchForm(false);
        setSearchResponse(undefined)
    }, [pathname])

    async function searchHandle(e: any) {
        let response = await search({ query: e.target.value });
        if (response.data)
            setSearchResponse(response.data);
        else
            setSearchResponse(undefined)
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
                            placeholder="عبارت مورد نظر خود را تایپ کنید ...."
                            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
                            autoFocus
                        />
                        <button type="button" onClick={() => setShowSearchForm(false)}>
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <input type="submit" hidden value="" />
                </div>
                {searchResponse &&
                    <div
                        className="absolute top-20 left-0 w-full h-96 bg-white  z-50 border rounded shadow border-t-0 overflow-y-scroll whitespace-nowrap ">
                        <div className="flex flex-col gap-y-1">
                            {
                                searchResponse.map((item) => (<>
                                    <Link href={"/product/" + item.url as Route}
                                        onChange={() => setSearchResponse(undefined)}>
                                        <div className="flex items-center gap-x-5 border-b">
                                            <div>
                                                <Image alt="product"
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.images.data[0].url}`}
                                                    width={100}
                                                    height={100} />
                                            </div>
                                            <span> {item.name}  </span>
                                        </div>

                                    </Link>
                                </>))
                            }
                            <div className="flex justify-center my-4">
                                <ButtonPrimary
                                    className="cursor-pointer"
                                    onClick={handleSearch}>مشاهده همه </ButtonPrimary>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    };

    const renderContent = () => {
        return (
            <div className="h-20 flex justify-between">
                <div className="flex items-center lg:hidden flex-1">
                    <MenuBar />
                </div>

                <div className="lg:flex-1 flex items-center">
                    <Logo className="flex-shrink-0" />
                </div>

                <div className="flex-[2] hidden lg:flex justify-center mx-4">
                    {showSearchForm ? renderSearchForm() : <Navigation />}
                </div>

                <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
                    {!showSearchForm && (
                        <button
                            className="hidden lg:flex w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none items-center justify-center"
                            onClick={() => setShowSearchForm(!showSearchForm)}
                        >
                            {renderMagnifyingGlassIcon()}
                        </button>
                    )}
                    <AvatarDropdown />
                    <CartDropdown />
                </div>
            </div>
        );
    };

    return (
        <div
            className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
            <div className="container ">{renderContent()}</div>
        </div>
    );
};

export default MainNav2Logged;
