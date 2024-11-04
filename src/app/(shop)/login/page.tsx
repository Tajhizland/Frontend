"use client"
import React, {FC} from "react";

import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import {login} from "@/services/api/auth/login";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";


const PageLogin = () => {
    const router = useRouter();

    async function action(e: FormData) {
        let params = {username: e.get("username") as string, password: e.get("password") as string}
        let res = await login(params)
        if (res) {
            setCookie('token', res.token);
            router.push("/")
        }
    }

    return (
        <>
            {/*<head>*/}
            {/*    <title>ورود</title>*/}
            {/*</head>*/}

            <div className={`nc-PageLogin`} data-nc-id="PageLogin">

                <div className="container mb-24 lg:mb-32">
                    <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                        ورود
                    </h2>
                    <div className="max-w-md mx-auto space-y-6">
                        {/* FORM */}
                        <form className="grid grid-cols-1 gap-6" action={action}>
                            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                شماره موبایل
              </span>
                                <Input
                                    type="text"
                                    name={"username"}
                                    placeholder="شماره موبایل"
                                    className="mt-1"
                                />
                            </label>
                            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                رمز‌عبور
                <Link href="/forgot-pass" className="text-sm text-green-600">
                 رمز‌عبور خود را فراموش کردید ؟
                </Link>
              </span>
                                <Input type="password" className="mt-1"
                                       name={"password"}
                                />
                            </label>
                            <ButtonPrimary type="submit">ادامه</ButtonPrimary>
                        </form>

                        {/* ==== */}
                        <span className="block text-center text-neutral-700 dark:text-neutral-300">
           حساب کاربری ندارید ؟ {` `}
                            <Link className="text-green-600" href="/signup">
              ایجاد حساب کاربری
            </Link>
          </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageLogin;
