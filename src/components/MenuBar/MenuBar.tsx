
import React, { useState, Fragment } from "react";
import { Transition, Dialog, TransitionChild } from "@headlessui/react"
import { menu } from "@/services/api/shop/menu";
import { useQuery } from "react-query";
import {BiCategoryAlt} from "react-icons/bi";
import NavMobile from "@/components/Header/Navigation/NavMobile";
import {getBrandList} from "@/services/api/shop/brand";

export interface MenuBarProps {}
const MenuBar: React.FC<MenuBarProps> = () => {
  const [isVisable, setIsVisable] = useState(false);

  const handleOpenMenu = () => setIsVisable(true);
  const handleCloseMenu = () => setIsVisable(false);

  const {data, isSuccess} = useQuery({
    queryKey: ['menu'],
    queryFn: () => menu(),
    staleTime: 5000,
});

  const {data:brand} = useQuery({
    queryKey: ['brand'],
    queryFn: () => getBrandList(),
    staleTime: 5000,
});


  const renderContent = () => {
    return (
      <Transition appear show={isVisable} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto w-full max-w-none"
          onClose={handleCloseMenu}
        >
          <div className="fixed right-0 top-0 bottom-0 w-full   md:w-auto z-max outline-none focus:outline-none">
            <React.Fragment>
              <TransitionChild
                enter="transition duration-100 transform"
                enterFrom="opacity-0 translate-x-14"
                enterTo="opacity-100 translate-x-0"
                leave="transition duration-150 transform"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 translate-x-14"
              >
                <div className="z-20 relative">
                  <NavMobile onClickClose={handleCloseMenu} brand={brand?.brand?.data}  data={data}/>
                </div>
              </TransitionChild>

              <TransitionChild
                enter="duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave=" duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-neutral-900/60" />
              </TransitionChild>
            </React.Fragment>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <>
        <button
            onClick={handleOpenMenu}
            className="p-2.5 rounded-lg text-neutral-700 dark:text-neutral-300 focus:outline-none flex items-center justify-center"
        >
            <div className={"flex flex-col justify-center items-center gap-y-2 cursor-pointer"}>
                <BiCategoryAlt  className={"w-5 h-5 text-[#fcb415]"}/>
                <span className={"text-xs text-neutral-500 font-bold whitespace-nowrap  dark:text-white"}>
                       دسته بندی
                        </span>
            </div>
        </button>

        {renderContent()}
    </>
  );
};

export default MenuBar;
