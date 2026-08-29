"use client"
import {Fragment, useState} from "react";
import {BellAlertIcon} from "@heroicons/react/24/solid";
import {Alert} from "@/shared/Alert/Alert";
import {Popover, PopoverButton, PopoverPanel, Transition} from "@headlessui/react";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {useApiMutation} from "@/hooks/useApiMutation";
import {seen, unseen} from "@/services/api/admin/notification";
import {NotificationResponse} from "@/services/types/notification";

export default function Bell() {
    const {data: data} = useQuery({
        queryKey: ['notification'],
        queryFn: () => unseen(),
        staleTime: 5000,
    });

    // لیست نمایش داده شده هنگام باز شدن پنل ثابت می‌ماند؛ چون بعد از seen کردن،
    // اندپوینت unseen دیگر چیزی برنمی‌گرداند و پنل خالی می‌شد.
    const [items, setItems] = useState<NotificationResponse[]>([]);

    const seenMutation = useApiMutation(() => seen(), {invalidate: [["notification"]], silent: true});

    function handleButtonClick(open: boolean) {
        if (open) return;
        setItems(data ?? []);
        if (data && data.length > 0) {
            seenMutation.mutate();
        }
    }

    function renderType(type: string) {
        let alertType: "default" | "warning" | "info" | "success" | "error" = "default";
        switch (type) {
            case "comment":
                alertType = "warning"
                break
            case "orderRequest":
                alertType = "error"
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
                            onClick={() => handleButtonClick(open)}
                            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-hidden flex items-center justify-center`}
                        >
                            <div className={"relative"}>
                                <BellAlertIcon className="h-6 w-6 text-slate-900"/>
                                {data && data.length > 0 && <div
                                    className={"absolute -right-2 -top-2 bg-rose-600 rounded-full flex justify-center items-start text-white font-bold text-xs w-4 h-4"}>
                                    {data.length}
                                </div>}
                            </div>
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
                                    className="overflow-y-scroll rounded-3xl max-h-[560px]  shadow-lg ring-1 ring-black/5 ">
                                    <div
                                        className="relative grid grid-cols-1 gap-6 bg-white dark:bg-neutral-800 py-7 px-6">


                                        {
                                            items.length > 0 ? items.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={item.link}
                                                    className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:outline-hidden focus-visible:ring-3 focus-visible:ring-orange-500/50 "
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
                                            )) : (
                                                <p className={"text-center text-sm text-neutral-500 dark:text-neutral-400"}>
                                                    اعلان جدیدی وجود ندارد
                                                </p>
                                            )
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
