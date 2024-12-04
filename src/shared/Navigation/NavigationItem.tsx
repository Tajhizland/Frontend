"use client";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@/app/(shop)/headlessui";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { FC, Fragment, useState } from "react";
import { Route } from "@/routers/types";
import Link from "next/link";
import { MenuResponse } from "@/services/types/menu";
import MenuCard from "@/components/MenuCard/MenuCard";
import { FaCircle, FaGripLinesVertical, FaRegCircleDot } from "react-icons/fa6";
import { PiDotFill } from "react-icons/pi";

export interface NavItemType {
  id: string;
  name: string;
  href: Route;
  targetBlank?: boolean;
  children?: NavItemType[];
  type?: "dropdown" | "megaMenu" | "none";
  isNew?: boolean;
}

export interface NavigationItemProps {
  menuItem: MenuResponse;
}

const NavigationItem: FC<NavigationItemProps> = ({ menuItem }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };


  // ===================== MENU MEGAMENU =====================
  const renderMegaMenu = (menu: MenuResponse) => {
    if (!menu.children?.data) {
      return null;
    }
    return (
      <li
        className={`menu-item flex-shrink-0 menu-megamenu menu-megamenu--large`}
      >
        {renderMainItem(menu)}

        <div className="invisible sub-menu absolute top-full inset-x-0 transform z-50">
          <div className="bg-white dark:bg-neutral-900 shadow-lg">
            <div className="container">
              <div className="flex text-sm border-t border-slate-200 dark:border-slate-700 py-5 ">
                <div className="flex-1 flex">
                  {menu.children.data.map((item, index) => (
                    <div key={index} className="border-l  px-4">
                      <Link href={item.url as Route} className="flex justify-center items-center gap-x-1">
                      <FaCircle className="text-orange-500 w-2 h-2" />
                        <strong className={"dark:text-white text-black  text-xs  whitespace-nowrap"}>
                          {item.title}
                        </strong>
                      </Link>
                      <div className=" grid grid-rows-8 grid-flow-col gap-x-8 gap-y-2 mt-5">

                      {item?.children?.data.map((item, index) => (
                        <div key={index}>

                          {renderMegaMenuNavlink(item)}
                        </div>
                      ))}
                        </div>

                    </div>
                  ))}
                </div>
                <div className="w-[30%] xl:w-[35%]">
                  <MenuCard color="bg-orange-100" featuredImage={menu.banner_logo} name={menu.banner_title as string} url={menu.banner_link} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  const renderMegaMenuNavlink = (item: MenuResponse) => {

    return (
      <li key={item.id} >
        <Link
          className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white text-xs whitespace-nowrap"
          href={{
            pathname: item.url || undefined,
          }}
        >
          {item.title}
        </Link>
      </li>
    );
  };

  // ===================== MENU DROPDOW =====================

  const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
    const isHover = menuCurrentHovers.includes(item.id);
    return (
      <Popover
        as="li"
        key={item.id}
        className="menu-item menu-dropdown relative px-2"
        onMouseEnter={() => onMouseEnterMenu(item.id)}
        onMouseLeave={() => onMouseLeaveMenu(item.id)}
      >
        {() => (
          <>
            <PopoverButton as={Fragment}>
              {renderDropdownMenuNavlink(item)}
            </PopoverButton>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <PopoverPanel
                static
                className="sub-menu absolute z-10 w-56 left-full pl-2 top-0"
              >
                <ul className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 text-sm relative bg-white dark:bg-neutral-900 py-4 grid space-y-1">
                  {item.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlink = (item: NavItemType) => {
    return (
      <Link
        className="flex items-center font-normal text-neutral-6000 dark:text-neutral-400 py-2 px-4 rounded-md hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        href={{
          pathname: item.href || undefined,
        }}
      >
        {item.name}
        {item.type && (
          <ChevronDownIcon
            className="mr-2 h-4 w-4 text-neutral-500"
            aria-hidden="true"
          />
        )}
      </Link>
    );
  };

  // ===================== MENU MAIN MENU =====================
  const renderMainItem = (item: MenuResponse) => {
    return (
      <div className="h-10 flex-shrink-0 flex items-center">
        <Link
          className="inline-flex items-center text-xs  font-medium text-slate-700 dark:text-slate-300 py-2.5 px-4 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          href={{
            pathname: item.url || undefined,
          }}
        >
          {item.title}
          <ChevronDownIcon
            className="mr-1 -ml-1 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
        </Link>
      </div>
    );
  };

  return renderMegaMenu(menuItem);

};

export default NavigationItem;
