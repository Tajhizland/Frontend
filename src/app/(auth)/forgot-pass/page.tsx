"use client"

import React, {useState} from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import {register, registerSendCode, registerVerifyCode} from "@/services/api/auth/register";
import Counter from "@/components/Counter/Counter";
import {resetPassword, resetPasswordSendCode, resetPasswordVerifyCode} from "@/services/api/auth/resetPassword";
import {useRouter} from "next/navigation";
import {setCookie} from "cookies-next";

const PageForgotPass = ({}) => {
    const [step, setStep] = useState(1);
    const [resend, setResend] = useState(false);
    const [mobile, setMobile] = useState("");
    const router = useRouter();

    function nextStep() {
        setStep(step + 1);
    }

    async function sendCode(e: FormData) {
        let mobile = e.get("mobile") as string;
        setMobile(mobile);
        let response = await resetPasswordSendCode({mobile: mobile})
        if (response?.success)
            nextStep()
    }

    async function actionResend() {
        let response = await resetPasswordSendCode({mobile: mobile})
        if (response?.success)
            setResend(false);
    }

    async function verifyCode(e: FormData) {
        let response = await resetPasswordVerifyCode({mobile: e.get("mobile") as string, code: e.get("code") as string})
        if (response?.success)
            nextStep()
    }

    async function setPassword(e: FormData) {
        let res = await resetPassword({
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
        <div className="container w-full">
            <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
                <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    فراموشی کلمه عبور
                </h2>
                {step == 1 && <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
 شماره موبایلی که قبلا با آن ثبت نام کرده اید را وارد نمایید و سپس روی ادامه کلیک کنید          </span>}
                {step == 2 && <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
                          کد ارسال شده به شماره موبایل خود را وارد نمایید و سپس روی ادامه کلیک کنید
          </span>}
                {step == 3 && <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
                    کلمه عبور جدید خود را وارد کنید و سپس روی ادامه کلیک کنید
                </span>}
                {step == 3 && <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
                   کلمه عبور باید حداقل ۸ حرف باشد
                </span>}
            </header>

            <div className="max-w-md mx-auto space-y-6">
                {/* FORM */}
                {step == 1 && <form className="grid grid-cols-1 gap-6" action={sendCode}>
                    <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
             شماره موبایل
            </span>
                        <Input
                            type="text"
                            name={"mobile"}
                            placeholder="شماره موبایل"
                            className="mt-1"
                        />
                    </label>
                    <ButtonPrimary type="submit">ادامه</ButtonPrimary>
                </form>}

                {step == 2 && <form className="grid grid-cols-1 gap-6" action={verifyCode}>
                    <label className="block">
                        <div className="flex flex-col gap-y-2">
              <span className="text-neutral-800 dark:text-neutral-200">
               کد ثبت نام
              </span>
                        </div>
                        <Input
                            name={"code"}
                            type="text"
                            placeholder="کد بازیابی"
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

                {step == 3 && <form className="grid grid-cols-1 gap-6" action={setPassword}>
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
          برگشت به صفحه {` `}
                    <Link href="/login" className="text-green-600">
           ورود
          </Link>
                    {` / `}
                    <Link href="/signup" className="text-green-600">
            ثبت نام
          </Link>
        </span>
            </div>
        </div>
    );
};

export default PageForgotPass;
