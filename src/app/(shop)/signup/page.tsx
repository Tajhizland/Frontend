"use client"
import React, {FC, useState} from "react";
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
    const [resend, setResend] = useState(false);
    const [mobile, setMobile] = useState("");
    const router = useRouter();

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
            password: e.get("password") as string,
            password_confirmation: e.get("password_confirmation") as string
        })
        if (res) {
            setCookie('token', res.token);
            router.push("/")
        }
    }

    return (
        <>
            <head>
                <title>ثبت‌نام</title>
            </head>

            <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">

                <div className="container mb-24 lg:mb-32">
                    <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                        ثبت‌نام
                    </h2>
                    <div className="max-w-md mx-auto space-y-6 ">

                        {/* FORM */}
                        {step == 1 && <form className="grid grid-cols-1 gap-6" action={sendCode} method="post">
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

                        {step == 2 && <form className="grid grid-cols-1 gap-6" action={verifyCode} method="post">
                            <label className="block">
                                <div className="flex flex-col gap-y-2">
              <span className="text-neutral-800 dark:text-neutral-200">
               کد ثبت نام
              </span>
                                    <small className={"text-neutral-600 dark:text-neutral-100"}>
                                        کد ارسال شده به شماره موبایل خود را وارد نمایید و سپس روی ادامه کلیک کنید :
                                    </small>
                                </div>
                                <Input
                                    name={"code"}
                                    type="text"
                                    placeholder="کد ثبت نام"
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
                                        <>  <Counter initialSeconds={120} end={() => {
                                            setResend(true)
                                        }}/>
                                            <span>
                                تا ارسال مجدد کد
                            </span>
                                        </>
                                }


                            </div>

                            <ButtonPrimary type="submit">ادامه</ButtonPrimary>
                        </form>}

                        {step == 3 && <form className="grid grid-cols-1 gap-6" action={setPassword} method="post">
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
