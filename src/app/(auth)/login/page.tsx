"use client"
import React, {useState} from "react";

import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import {login} from "@/services/api/auth/login";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";


const PageLogin = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(false);

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const actionLogin = useMutation({
        mutationKey: [`login`],
        mutationFn: async (formData: any) => {
            return login({
                ...formData,
            });
        },
        onSuccess: (response) => {
            if (!response)
                return;
            setIsLogin(true);
            setCookie('token', response.token);
            router.push("/")
        },
    });

    const onSubmit = async (formData: any) => {
        await actionLogin.mutateAsync(formData);
    };

    return (
        <>
            {/*<head>*/}
            {/*    <title>ورود</title>*/}
            {/*</head>*/}

            <div className={`nc-PageLogin w-full`} data-nc-id="PageLogin">

                <div className="container">
                    <h2 className="my-1 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                        ورود
                    </h2>
                    <div className="max-w-md mx-auto space-y-6">
                        {/* FORM */}
                        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmit)}>
                            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                شماره موبایل
              </span>
                                <Input
                                    type="text"
                                    {...register("username")}
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
                                       {...register("password")}
                                />
                            </label>
                            <ButtonPrimary type="submit"
                                           loading={actionLogin.isLoading || isLogin}>ادامه</ButtonPrimary>
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
