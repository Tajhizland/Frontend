"use client"
import React, {FC, useEffect, useState} from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import {register, registerSendCode, registerVerifyCode} from "@/services/api/auth/register";
import useCountDownTime from "@/hooks/useCountDownTime";
import Counter from "@/components/Counter/Counter";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";

const PageSignUp = () => {
    const [step, setStep] = useState(1);
    const [initialSeconds, setInitialSeconds] = useState(1);
    const [resend, setResend] = useState(false);
    const [mobile, setMobile] = useState("");
    const router = useRouter();

    useEffect(() => {
        setInitialSeconds(120);
    }, [step]);

    function nextStep() {
        setStep(step + 1);
    }

    async function sendCode(e: FormData) {
        let mobile = e.get("mobile") as string
        setMobile(mobile);
        let response = await registerSendCode({mobile: mobile})
        if (response?.success)
            nextStep()
    }

    async function changeMobile() {
        setStep(step - 1);
    }

    async function actionResend() {
        let response = await registerSendCode({mobile: mobile})
        if (response?.success)
            setResend(false);
    }

    async function verifyCode(e: FormData) {
        let response = await registerVerifyCode({mobile: e.get("mobile") as string, code: e.get("code") as string})
        if (response?.success)
            nextStep()
    }

    async function setPassword(e: FormData) {
        let res = await register({
            mobile: e.get("mobile") as string,
            name: e.get("name") as string,
            last_name: e.get("last_name") as string,
            national_code: e.get("national_code") as string,
            password: e.get("password") as string,
            password_confirmation: e.get("password_confirmation") as string
        })
        if (res) {
            console.log("res",res)
            console.log("restoken",res.token)
            setCookie('token', res.token);
            window.location.href="/";
            // router.push("/")
        }
    }

    return (
        <>
            {/*<head>*/}
            {/*    <title>ثبت‌نام</title>*/}
            {/*</head>*/}

            <div className={`nc-PageSignUp w-full`} data-nc-id="PageSignUp">

                <div className="container ">
                    <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                        ثبت‌نام
                    </h2>
                    <div className="max-w-md mx-auto space-y-6 ">

                        {/* FORM */}
                        {step == 1 && <form className="grid grid-cols-1 gap-6" action={sendCode}>
                            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
               شماره ‌همراه
              </span>
                                <Input
                                    name={"mobile"}
                                    type="text"
                                    placeholder="شماره همراه"
                                    className="mt-1"
                                />
                            </label>
                            <ButtonPrimary type="submit">ادامه</ButtonPrimary>
                        </form>}

                        {step == 2 && <form className="grid grid-cols-1 gap-6" action={verifyCode}>
                            <label className="block">
                                <div className="flex flex-col gap-y-2">

                                    <small className={"text-neutral-600 dark:text-neutral-100 font-bold"}>
                                        کد یکبار مصرف به شماره تماس {mobile} ارسال شد
                                    </small>
                                    <small className={"text-neutral-600 dark:text-neutral-100"}>
                                        کد ارسال شده به شماره موبایل خود را وارد نمایید و سپس روی ادامه کلیک کنید :
                                    </small>

                                </div>
                                <Input
                                    name={"code"}
                                    type="text"
                                    placeholder="کد یکبار مصرف"
                                    className="mt-1"
                                />
                                <Input
                                    name={"mobile"}
                                    type="hidden"
                                    value={mobile}
                                />
                            </label>

                            <div className={"flex gap-x-2"}>

                                {
                                    resend ? <span className={"text-green-600 cursor-pointer"} onClick={actionResend}>
                                  ارسال مجدد کد
                            </span> :
                                        <>  <Counter initialSeconds={initialSeconds} end={() => {
                                            setResend(true)
                                        }}/>
                                            <span>
                                تا ارسال مجدد کد
                            </span>
                                        </>
                                }


                            </div>
                            <span className={"text-sm font-bold text-primary-700 cursor-pointer"}
                                  onClick={changeMobile}>
                                اصلاح شماره
                            </span>
                            <ButtonPrimary type="submit">ادامه</ButtonPrimary>

                        </form>}

                        {step == 3 && <form className="grid grid-cols-1 gap-6" action={setPassword}>
                            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                نام
              </span>
                                <Input type={"text"} placeholder="نام" className="mt-1" name={"name"}/>

                            </label>
                            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                نام خانوادگی
              </span>
                                <Input type={"text"} placeholder="نام خانوادگی" className="mt-1" name={"last_name"}/>

                            </label>
                            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                کد ملی
              </span>
                                <Input type={"text"} placeholder="کد ملی" className="mt-1" name={"national_code"}/>

                            </label>
                            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                کلمه عبور
              </span>
                                <Input type={"password"} placeholder="کلمه عبور" className="mt-1" name={"password"}/>

                            </label>
                            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
تکرار کلمه عبور              </span>
                                <Input type={"password"} placeholder="تکرار کلمه عبور" className="mt-1"
                                       name={"password_confirmation"}/>
                                <Input
                                    name={"mobile"}
                                    type="hidden"
                                    value={mobile}
                                />
                            </label>

                            <ButtonPrimary type="submit">ادامه</ButtonPrimary>
                        </form>}

                        {/* ==== */}
                        <span className="block text-center text-neutral-700 dark:text-neutral-300">
            قلا ثبت‌نام کرده اید ؟ {` `}
                            <Link className="text-green-600" href="/login">
             وارد شوید
            </Link>
          </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageSignUp;
