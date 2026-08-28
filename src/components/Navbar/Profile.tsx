"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-hot-toast";
import { LuKeyRound, LuLogOut, LuUserRound, LuWallet } from "react-icons/lu";
import avatar from "@/images/avatar.svg";
import { me } from "@/services/api/auth/me";
import { logout } from "@/services/api/auth/logout";

const ITEM =
    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 transition-colors " +
    "hover:bg-slate-50 hover:text-slate-900 focus:outline-hidden";

export default function Profile() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => me(),
        staleTime: 60_000,
        enabled: !!getCookie("token"),
    });

    const logoutMutation = useMutation({
        mutationKey: ["logout"],
        mutationFn: () => logout(),
        onSuccess: (response) => {
            deleteCookie("token");
            queryClient.clear();
            toast.success(response?.message as string);
            router.replace("/login");
        },
    });

    const fullName = [user?.name, user?.last_name].filter(Boolean).join(" ").trim();

    return (
        <Popover className="relative">
            {({ close }) => (
                <>
                    <PopoverButton
                        className="flex items-center gap-2 p-1 pl-2 rounded-full transition-colors hover:bg-slate-100 outline-hidden focus-visible:ring-3 focus-visible:ring-slate-900/15"
                        title="حساب کاربری"
                    >
                        <span className="sr-only">باز کردن منوی کاربر</span>
                        <Image
                            src={user?.avatar ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/avatar/${user.avatar}` : avatar}
                            alt="avatar"
                            width={34}
                            height={34}
                            className="w-[34px] h-[34px] rounded-full object-cover bg-slate-100"
                        />
                        <span className="hidden sm:block max-w-28 truncate text-sm text-slate-700">
                            {fullName || user?.username || "کاربر"}
                        </span>
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
                        <PopoverPanel className="absolute left-0 z-50 mt-3 w-64">
                            <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5">
                                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100">
                                    <p className="text-sm font-semibold text-slate-800 truncate">
                                        {fullName || "بدون نام"}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate mt-0.5">{user?.username ?? "—"}</p>
                                    {user?.wallet != null && (
                                        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-slate-600">
                                            <LuWallet className="w-3.5 h-3.5 text-slate-400" />
                                            کیف پول: <b>{Number(user.wallet).toLocaleString("fa-IR")}</b> تومان
                                        </p>
                                    )}
                                </div>

                                <div className="p-2 flex flex-col">
                                    <Link href="/account" className={ITEM} onClick={() => close()}>
                                        <LuUserRound className="w-4 h-4 text-slate-400" />
                                        ویرایش پروفایل
                                    </Link>
                                    <Link href="/account-password" className={ITEM} onClick={() => close()}>
                                        <LuKeyRound className="w-4 h-4 text-slate-400" />
                                        تغییر کلمه عبور
                                    </Link>
                                    <button
                                        type="button"
                                        disabled={logoutMutation.isPending}
                                        onClick={() => {
                                            close();
                                            logoutMutation.mutate();
                                        }}
                                        className={`${ITEM} w-full text-rose-600 hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50`}
                                    >
                                        <LuLogOut className="w-4 h-4" />
                                        خروج
                                    </button>
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
