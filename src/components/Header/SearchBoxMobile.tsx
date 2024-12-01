"use client";

import React, { createRef, useState } from "react";
import { useMutation } from "react-query";
import { FaBorderAll, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Route } from "next";
import { PiSmileySad } from "react-icons/pi";
import { search } from "@/services/api/shop/search";
import { useRouter } from "next/navigation";
import Logo from "@/shared/Logo/Logo";
import Image from "next/image";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";

export interface NavMobileProps {
    onClickClose?: () => void;
}

const SearchBoxMobile: React.FC<NavMobileProps> = ({
    onClickClose,
}) => {
    const [open, setOpen] = useState<Boolean>(false);
    const inputRef = createRef<HTMLInputElement>();

    const router = useRouter();


    const {
        data,
        mutateAsync: searchHandle,
        isLoading,
        isSuccess,
    } = useMutation({
        mutationKey: [`search`],
        mutationFn: (query: string) => {
            if (query.trim()) {
                return search({ query });
            }
            return Promise.reject();
        },
    });

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
                    <div
                        className="bg-neutral-100 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded  ">
                        <FaMagnifyingGlass className={"text-neutral-500 w-4 h-4"} />
                        <input
                            onChange={(e) => {
                                searchHandle(e.target.value)
                            }}

                            // ref={inputRef}
                            type="text"
                            placeholder="جستجو"
                            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm"
                            autoFocus
                        />

                    </div>
                    <input type="submit" hidden value="" />
                </div>

            </div>
        );
    };
    const handleSearch = () => {
        router.push("/search/" + inputRef.current?.value as Route);
    }
    return (
        <div
            className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1  bg-white dark:bg-slate-900 divide-y-2 divide-neutral-100 ">
            <div className="py-6 px-1">


                <span className="absolute right-2 top-2 p-1">
                    <ButtonClose onClick={onClickClose} />
                </span>
                <div className={"flex justify-center"}>
                    <Logo />
                </div>
                <div className="mt-5">{renderSearchForm()}</div>
                {isSuccess && data &&
                    <div
                        className="  w-full bg-white  dark:bg-slate-900 z-50   rounded     overflow-y-scroll whitespace-nowrap overflow-x-hidden">

                        <div className="flex flex-col relative  ">
                            {
                                data.data.length > 0 ? data.data.map((item) => (<>
                                    <Link href={"/product/" + item.url as Route} >
                                        <div className="flex items-center justify-between  py-2 px-1 hover:bg-stone-100 dark:bg-black/30 dark:hover:bg-black/20 ">
                                            <div className="flex items-center gap-x-5  ">
                                                <div className={""}>
                                                    <Image alt="productImage"
                                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.images.data[0].url}`}
                                                        width={50}
                                                        height={50} />

                                                </div>
                                                <div>
                                                    <span
                                                        className={"text-sm text-neutral-800 font-bold  dark:text-white"}> {item.name}  </span>
                                                </div>
                                            </div>
                                            <div>
                                                <FaExternalLinkAlt className={" text-neutral-400 dark:text-white"} />
                                            </div>
                                        </div>

                                    </Link>
                                </>))
                                    :
                                    <div
                                        className="flex flex-col w-full h-full   items-center gap-y-5 p-5 bg-stone-100 dark:bg-slate-800  text-center ">
                                        <div>
                                            <PiSmileySad className={"text-neutral-500 dark:text-white w-14 h-14"} />
                                        </div>
                                        <span className={"text-sm text-neutral-800 dark:text-white font-bold"}>
                                            موردی یافت نشد !
                                        </span>
                                    </div>
                            }
                            {data.data.length > 0 && <div
                                className="flex items-center gap-x-5 border-t p-5 bg-stone-100  dark:bg-slate-800  dark:hover:bg-slate-700 hover:bg-stone-200 text-center cursor-pointer"
                                onClick={handleSearch}>
                                <div>
                                    <FaBorderAll className={"text-neutral-500 dark:text-white"} />
                                </div>
                                <span className={"text-sm text-neutral-800 dark:text-white font-bold"}>
                                    مشاهده همه
                                </span>
                            </div>}
                        </div>
                    </div>}

            </div>
        </div>
    );
};
export default SearchBoxMobile;
