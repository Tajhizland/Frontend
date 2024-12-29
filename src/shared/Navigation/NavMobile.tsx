"use client";

import React, {Fragment} from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";
import Logo from "@/shared/Logo/Logo";
import {Disclosure} from "@/app/(shop)/headlessui";
import SocialsList from "@/shared/SocialsList/SocialsList";
import {ChevronDownIcon} from "@heroicons/react/24/solid";
import SwitchDarkMode from "@/shared/SwitchDarkMode/SwitchDarkMode";
import Link from "next/link";
import {MenuResponse} from "@/services/types/menu";
import Image from "next/image";
import BlogLink from "@/components/Header/BlogLink";
import VlogLink from "@/components/Header/VlogLink";

export interface NavMobileProps {
    data?: MenuResponse[];
    onClickClose?: () => void;
}

const NavMobile: React.FC<NavMobileProps> = ({
                                                 data,
                                                 onClickClose,
                                             }) => {


    const _renderMenuChild = (
        item: MenuResponse,
        itemClass = "  text-neutral-900 dark:text-neutral-200 font-medium "
    ) => {
        return (
            <>
                <div className={"grid grid-cols-3 gap-2"}>
                    {item.children?.data?.map((item, index) => (
                        <Fragment key={index} >
                            {item.children?.data?.map((i, index) => (

                                <Disclosure key={index} as="li">
                            <Link
                                href={{
                                    pathname: i.url || undefined,
                                }}
                                className={`  justify-center text-center items-center flex flex-col text-sm rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 mt-0.5 ${itemClass}`}
                            >
                                <div className={"border rounded-full overflow-x-hidden w-16 h-16"}>
                                    <Image
                                        alt=""
                                        width={500}
                                        height={100}
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/menu/${i.banner_logo}`}
                                        className="   w-full  h-full "
                                    />
                                </div>
              <span
                  className={`py-2.5 text-center text-xs ${!i.children ? "block w-full" : ""}`}
                  onClick={onClickClose}
              >
                {i.title}
              </span>

                            </Link>

                        </Disclosure>
                            ))}

                        </Fragment>
                    ))}
                </div>
            </>
        );
    };

    const _renderItem = (item: MenuResponse, index: number) => {
        return (
            <Disclosure
                key={index}
                as="li"
                className="text-slate-900 dark:text-white"
            >
                {/*<Link*/}
                {/*  className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"*/}
                {/*  href={{*/}
                {/*    pathname: item.url || undefined,*/}
                {/*  }}*/}
                {/*>*/}
                <div
                    className="flex w-full items-center py-2.5 px-4 font-medium uppercase tracking-wide text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
          <span
              className={!item.children?.data ? "block w-full" : ""}
              // onClick={onClickClose}
          >
            {item.title}
          </span>
                    {item.children?.data && (
                        <span
                            className="block flex-grow"
                            onClick={(e) => e.preventDefault()}
                        >
              <Disclosure.Button
                  as="span"
                  className="flex justify-end flex-grow"
              >
                <ChevronDownIcon
                    className="ml-2 h-4 w-4 text-neutral-500"
                    aria-hidden="true"
                />
              </Disclosure.Button>
            </span>
                    )}
                </div>
                {/*</Link>*/}
                {item.children?.data && (
                    <Disclosure.Panel>{_renderMenuChild(item)}</Disclosure.Panel>
                )}
            </Disclosure>
        );
    };

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
            <form
                action=""
                method="POST"
                className="flex-1 text-slate-900 dark:text-slate-200"
            >
                <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1 py-2 px-4 rounded-xl h-full">
                    {renderMagnifyingGlassIcon()}
                    <input
                        type="search"
                        placeholder="عبارت مورد نظر خود را  جستجو کنید"
                        className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-sm "
                    />
                </div>
                <input type="submit" hidden value=""/>
            </form>
        );
    };

    return (
        <div
            className="overflow-y-auto w-full h-screen py-2 transition transform shadow-lg ring-1 dark:ring-neutral-700 bg-white dark:bg-neutral-900 divide-y-2 divide-neutral-100 dark:divide-neutral-800">
            <div className="py-6 px-5">
                <div className={"flex justify-center"}>
                <Logo imageClassName={"h-8"}/>
                </div>
                <div className="flex flex-col mt-5 text-slate-600 dark:text-slate-300 text-sm">

                    <div className="flex justify-between items-center mt-4">
                         <div className={"flex items-center gap-x-1"}>
                        <BlogLink />
                        <VlogLink />
                         </div>
                        <span className="block">
              <SwitchDarkMode className="bg-neutral-100 dark:bg-neutral-800"/>
            </span>
                    </div>
                </div>
                <span className="absolute right-2 top-2 p-1">
          <ButtonClose onClick={onClickClose}/>
        </span>

            </div>
            <ul className="flex flex-col py-6 px-2 space-y-1">
                {data && data.map(_renderItem)}
            </ul>

        </div>
    );
};

export default NavMobile;
