"use client"
import Label from "@/components/Label/Label";
import React, {FC} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import Select from "@/shared/Select/Select";
import Textarea from "@/shared/Textarea/Textarea";
import {avatarImgs} from "@/contains/fakeData";
import Image from "next/image";
import {setUser, useUser} from "@/services/globalState/GlobalState";
import {useQuery} from "react-query";
import {me, update} from "@/services/api/auth/me";
import {getCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";

const AccountPage = () => {

    const [user] = useUser();


    async function submit(e: FormData) {
        let response = await update({
            name: e.get("name") as string,
            email: e.get("email") as string,
            gender: e.get("gender") as string,
            avatar: e.get("avatar") as File,
        })
        if (response?.success)
            toast.success(response?.message as string);
    }

    return (
        <div className={`nc-AccountPage `}>
            <div className="space-y-10 sm:space-y-12">
                {/* HEADING */}
                <h2 className="text-2xl sm:text-3xl font-semibold">
                    اطلاعات حساب کاربری
                </h2>
                <form action={submit}>

                    <div className="flex flex-col md:flex-row">
                        <div className="flex-shrink-0 flex items-start">
                            {/* AVATAR */}
                            <div className="relative rounded-full overflow-hidden flex">
                                <Image
                                    src={(user?.avatar) ?
                                        `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/avatar/${user?.avatar}`
                                        : avatarImgs[2]
                                    }

                                    alt="avatar"
                                    width={128}
                                    height={128}
                                    className="w-32 h-32 rounded-full object-cover z-0"
                                />
                                <div
                                    className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-neutral-50 cursor-pointer">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 30 30"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17.5 5H7.5C6.83696 5 6.20107 5.26339 5.73223 5.73223C5.26339 6.20107 5 6.83696 5 7.5V20M5 20V22.5C5 23.163 5.26339 23.7989 5.73223 24.2678C6.20107 24.7366 6.83696 25 7.5 25H22.5C23.163 25 23.7989 24.7366 24.2678 24.2678C24.7366 23.7989 25 23.163 25 22.5V17.5M5 20L10.7325 14.2675C11.2013 13.7988 11.8371 13.5355 12.5 13.5355C13.1629 13.5355 13.7987 13.7988 14.2675 14.2675L17.5 17.5M25 12.5V17.5M25 17.5L23.0175 15.5175C22.5487 15.0488 21.9129 14.7855 21.25 14.7855C20.5871 14.7855 19.9513 15.0488 19.4825 15.5175L17.5 17.5M17.5 17.5L20 20M22.5 5H27.5M25 2.5V7.5M17.5 10H17.5125"
                                            stroke="currentColor"
                                            strokeWidth={1.5}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>

                                    <span className="mt-1 text-xs">ویرایش تصویر</span>
                                </div>
                                <input
                                    type="file"
                                    name={"avatar"}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                        <div className="flex-grow mt-10 md:mt-0 md:pr-16 max-w-3xl space-y-6">
                            <div>
                                <Label>نام کامل</Label>
                                <Input className="mt-1.5" defaultValue={user?.name} name={"name"}/>
                            </div>

                            {/* ---- */}

                            {/* ---- */}
                            <div>
                                <Label>ایمیل</Label>
                                <div className="mt-1.5 flex">
                <span
                    className="inline-flex items-center px-2.5 rounded-r-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-envelope"></i>
                </span>
                                    <Input
                                        className="!rounded-r-none"
                                        placeholder="example@email.com"
                                        name={"email"}
                                        defaultValue={user?.email}
                                    />
                                </div>
                            </div>

                            {/* ---- */}

                            {/*            <div>*/}
                            {/*                <Label>آدرس</Label>*/}
                            {/*                <div className="mt-1.5 flex">*/}
                            {/*<span*/}
                            {/*    className="inline-flex items-center px-2.5 rounded-r-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">*/}
                            {/*  <i className="text-2xl las la-map-signs"></i>*/}
                            {/*</span>*/}
                            {/*                    <Input*/}
                            {/*                        className="!rounded-r-none"*/}
                            {/*                        defaultValue="New york, USA"*/}
                            {/*                        name={"address"}*/}
                            {/*                    />*/}
                            {/*                </div>*/}
                            {/*            </div>*/}

                            {/* ---- */}
                            <div>
                                <Label>جنسیت</Label>
                                <Select className="mt-1.5" name={"gender"}>
                                    <option value="1" selected={user?.gender == 1}>مرد</option>
                                    <option value="0" selected={user?.gender == 0}>زن</option>
                                </Select>
                            </div>

                            {/* ---- */}
                            <div>
                                <Label>شماره همراه</Label>
                                <div className="mt-1.5 flex">
                <span
                    className="inline-flex items-center px-2.5 rounded-r-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <i className="text-2xl las la-phone-volume"></i>
                </span>
                                    <Input name={"mobile"} className="!rounded-r-none" defaultValue={user?.username}
                                           readOnly/>
                                </div>
                            </div>
                            {/* ---- */}
                            {/* <div>
              <Label>About you</Label>
              <Textarea className="mt-1.5" defaultValue="..." />
            </div> */}
                            <div className="pt-2">
                                <ButtonPrimary>ویرایش</ButtonPrimary>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AccountPage;
