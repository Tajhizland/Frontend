"use client"
import {Fragment} from "react";
import {BellAlertIcon} from "@heroicons/react/24/solid";
import {Alert} from "@/shared/Alert/Alert";
import {Popover, PopoverButton, PopoverPanel, Transition} from "@headlessui/react";
import Link from "next/link";
import {useQuery} from "react-query";
import {unseen} from "@/services/api/admin/notification";
import {Route} from "next";

export default function Bell() {
    const {data: data} = useQuery({
        queryKey: ['notification'],
        queryFn: () => unseen(),
        staleTime: 5000,
    });

    function renderType(type: string) {
        let alertType: "default" | "warning" | "info" | "success" | "error" = "default";
        switch (type) {
            case "comment":
                alertType = "warning"
                break
            case "order":
                alertType = "success"
                break
            case "onHoldOrder":
                alertType = "info"
                break
            default:
                alertType = "default"
        }
        return alertType;
    }

    return (
        <div className="AvatarDropdown ">
            <Popover className="relative">
                {({open, close}) => (
                    <>
                        <PopoverButton
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none flex items-center justify-center`}
                        >
                            <BellAlertIcon className="h-6 w-6 text-slate-900"/>
                        </PopoverButton>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel
                                className="absolute z-10 w-screen max-w-[350px] px-4 mt-3.5 -left-10 sm:left-0 sm:px-0">
                                <div
                                    className="overflow-y-scroll rounded-3xl max-h-[560px]  shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div
                                        className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">


                                        {
                                            data && data.map((item) => (<>
                                                <Link
                                                    href={item.link as Route}
                                                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                    onClick={() => close()}
                                                >
                                                    <Alert type={renderType(item.type)}
                                                           containerClassName={"w-full"}>
                                                        <div className={"flex flex-col"}>
                                                         <h4 className={"text-black"}>  {item.title}</h4>
                                                           <p> {item.message}</p>

                                                        </div>
                                                    </Alert>
                                                </Link>
                                            </>))
                                        }

                                    </div>
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    );


}
