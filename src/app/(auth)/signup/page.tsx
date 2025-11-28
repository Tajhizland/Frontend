"use client"
import React, {useEffect, useState} from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import {registerSendCode, registerUser, registerVerifyCode} from "@/services/api/auth/register";
import Counter from "@/components/Counter/Counter";
import {setCookie} from "cookies-next";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";

const PageSignUp = () => {
    const [step, setStep] = useState(1);
    const [initialSeconds, setInitialSeconds] = useState(120);
    const [resend, setResend] = useState(false);
    const [mobile, setMobile] = useState("");
    const router = useRouter();

    useEffect(() => {
        setInitialSeconds(120);
    }, [step]);

    function nextStep() {
        setStep(step + 1);
    }

    const actionSendCode = useMutation({
        mutationKey: [`register-send-code`],
        mutationFn: async (formData: any) => {
            setMobile(formData.mobile);
            return registerSendCode({
                mobile: formData.mobile
            });
        },
        onSuccess: (response) => {
            if (!response)
                return;
            nextStep()
        },
    });

    const actionVerifyCode = useMutation({
        mutationKey: [`register-verify-code`],
        mutationFn: async (formData: any) => {
            return registerVerifyCode({
                mobile: formData.mobile,
                code: formData.code
            });
        },
        onSuccess: (response) => {
            if (!response)
                return;
            nextStep()
        },
    });
    const actionSetPassword = useMutation({
        mutationKey: [`register-final`],
        mutationFn: async (formData: any) => {
            setMobile(formData.mobile);
            return registerUser({
                mobile: formData.mobile,
                name: formData.name,
                last_name: formData.last_name,
                national_code: formData.national_code,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            });
        },
        onSuccess: (response) => {
            if (!response)
                return;
            setCookie('token', response.token);
            window.location.href = "/";
        },
    });

    async function changeMobile() {
        setStep(step - 1);
    }

    async function actionResend() {
        let response = await registerSendCode({mobile: mobile})
        if (response?.success)
            setResend(false);
    }

    const {register, handleSubmit, control, formState: {errors}, setValue} = useForm({
        defaultValues: {
            mobile: "",
            code: "",
            name: "",
            last_name: "",
            national_code: "",
            password: "",
            password_confirmation: "",
        },
    });


    const onSubmitSendCode = async (formData: any) => {
        await actionSendCode.mutateAsync(formData);
    };

    const onSubmitVerifyCode = async (formData: any) => {
        await actionVerifyCode.mutateAsync(formData);
    };

    const onSubmitSetPassword = async (formData: any) => {
        await actionSetPassword.mutateAsync(formData);
    };

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
                        {step == 1 &&
                            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmitSendCode)}>
                                <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
               شماره ‌همراه
              </span>
                                    <Input
                                        {...register("mobile")}
                                        type="text"
                                        placeholder="شماره همراه"
                                        className="mt-1"
                                    />
                                </label>
                                <ButtonPrimary type="submit" loading={actionSendCode.isLoading}>ادامه</ButtonPrimary>
                            </form>}

                        {step == 2 &&
                            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmitVerifyCode)}>
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
                                        {...register("code")}
                                        type="text"
                                        placeholder="کد یکبار مصرف"
                                        className="mt-1"
                                    />
                                    <Input
                                        {...register("mobile")}
                                        type="hidden"
                                        value={mobile}
                                    />
                                </label>

                                <div className={"flex gap-x-2"}>

                                    {
                                        resend ?
                                            <span className={"text-green-600 cursor-pointer"} onClick={actionResend}>
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
                                <ButtonPrimary type="submit" loading={actionVerifyCode.isLoading}>ادامه</ButtonPrimary>

                            </form>}

                        {step == 3 &&
                            <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit(onSubmitSetPassword)}>
                                <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                نام
              </span>
                                    <Input type={"text"} placeholder="نام" className="mt-1"   {...register("name")}/>

                                </label>
                                <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                نام خانوادگی
              </span>
                                    <Input type={"text"} placeholder="نام خانوادگی"
                                           className="mt-1"   {...register("last_name")}/>

                                </label>
                                <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                کد ملی
              </span>
                                    <Input type={"text"} placeholder="کد ملی"
                                           className="mt-1"   {...register("national_code")}/>

                                </label>
                                <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                کلمه عبور
              </span>
                                    <Input type={"password"} placeholder="کلمه عبور"
                                           className="mt-1"   {...register("password")}/>

                                </label>
                                <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
تکرار کلمه عبور              </span>
                                    <Input type={"password"} placeholder="تکرار کلمه عبور" className="mt-1"
                                           {...register("password_confirmation")}/>
                                    <Input
                                        name={"mobile"}
                                        type="hidden"
                                        value={mobile}
                                    />
                                </label>

                                <ButtonPrimary type="submit" loading={actionSetPassword.isLoading}>ادامه</ButtonPrimary>
                            </form>}

                        <span className={"text-sm "}>
                            ورود شما به تجهیزلند به معنای پذیرش
                            {" "}
                            <Link href={"/page/rule"} className={"text-[#fcb415]"}>
                                قوانین و مقررات
                            </Link>
                            {" "}

                            سایت تجهیزلند هست
                        </span>

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
