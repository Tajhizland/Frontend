"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { setCookie } from "cookies-next";

import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
import Counter from "@/components/Counter/Counter";

import { login } from "@/services/api/auth/login";
import { registerUser } from "@/services/api/auth/register";
import { checkMobile, otpSend, otpVerify } from "@/services/api/auth/otpAuth";
import {
    resetPassword,
    resetPasswordSendCode,
    resetPasswordVerifyCode,
} from "@/services/api/auth/resetPassword";
import { syncCartAfterLogin } from "@/services/cart/cartActions";

type Step =
    | "ENTER_MOBILE"
    | "ENTER_PASSWORD"
    | "VERIFY_OTP"
    | "COMPLETE_REGISTER"
    | "FORGOT_MOBILE"
    | "FORGOT_OTP"
    | "RESET_PASSWORD";

interface AuthFlowProps {
    initialStep?: "ENTER_MOBILE" | "FORGOT_MOBILE";
}

const inputSizeClass = "h-14 px-4 py-3";
const inputClass =
    "mt-1 bg-[#f5f6fb] dark:bg-neutral-800 border-transparent text-center text-base";
const buttonClass = "w-full !rounded-xl h-14 mt-2";
const RESEND_SECONDS = 120;

const AuthFlow: React.FC<AuthFlowProps> = ({ initialStep = "ENTER_MOBILE" }) => {
    const [step, setStep] = useState<Step>(initialStep);
    const [mobile, setMobile] = useState("");
    const [resendReady, setResendReady] = useState(false);
    const [counterKey, setCounterKey] = useState(0);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            mobile: "",
            password: "",
            code: "",
            name: "",
            last_name: "",
            national_code: "",
            password_confirmation: "",
        },
    });

    // ورود موفق: ست کوکی، ادغام سبد خرید مهمان و ریدایرکت
    async function loginWithToken(token: string) {
        const oneYear = Date.now() + 365 * 24 * 60 * 60 * 1000;
        setCookie("token", token, {
            domain: "tajhizland.com",
            path: "/",
            expires: new Date(oneYear),
        });

        try {
            await syncCartAfterLogin();
        } catch {
            // در صورت خطای ادغام، جریان ورود متوقف نمی‌شود
        }

        const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl");
        window.location.href = callbackUrl || "/";
    }

    function goToOtpStep(target: "VERIFY_OTP" | "FORGOT_OTP") {
        setResendReady(false);
        setCounterKey((k) => k + 1);
        setStep(target);
    }

    // مرحله ۱: بررسی شماره موبایل
    const actionCheck = useMutation({
        mutationKey: ["auth-check"],
        mutationFn: async (formData: any) => {
            setMobile(formData.mobile);
            const res = await checkMobile({ mobile: formData.mobile });
            if (!res) return null;
            // کاربر موجود با رمز عبور => صفحه رمز عبور
            if (res.exists && res.has_password) {
                return { next: "PASSWORD" as const };
            }
            // کاربر موجود بدون رمز یا کاربر جدید => ارسال کد یکبار مصرف
            const send = await otpSend({ mobile: formData.mobile });
            if (!send) return null;
            return { next: "OTP" as const };
        },
        onSuccess: (result) => {
            if (!result) return;
            if (result.next === "PASSWORD") setStep("ENTER_PASSWORD");
            else goToOtpStep("VERIFY_OTP");
        },
    });

    // ورود با رمز عبور
    const actionLogin = useMutation({
        mutationKey: ["auth-login"],
        mutationFn: async (formData: any) =>
            login({ username: mobile, password: formData.password }),
        onSuccess: async (response) => {
            if (!response) return;
            await loginWithToken(response.token);
        },
    });

    // ورود با کد یکبار مصرف از روی صفحه رمز عبور
    const actionOtpLogin = useMutation({
        mutationKey: ["auth-otp-login"],
        mutationFn: async () => otpSend({ mobile }),
        onSuccess: (response) => {
            if (!response) return;
            goToOtpStep("VERIFY_OTP");
        },
    });

    // تایید کد یکبار مصرف
    const actionVerifyOtp = useMutation({
        mutationKey: ["auth-otp-verify"],
        mutationFn: async (formData: any) =>
            otpVerify({ mobile, code: formData.code }),
        onSuccess: async (response) => {
            if (!response) return;
            // کاربر جدید => مرحله تکمیل ثبت‌نام
            if (response.is_new_user || !response.token) {
                setStep("COMPLETE_REGISTER");
                return;
            }
            // کاربر موجود => ورود مستقیم
            await loginWithToken(response.token);
        },
    });

    // تکمیل ثبت‌نام کاربر جدید
    const actionRegister = useMutation({
        mutationKey: ["auth-register"],
        mutationFn: async (formData: any) =>
            registerUser({
                mobile,
                name: formData.name,
                last_name: formData.last_name,
                national_code: formData.national_code,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            }),
        onSuccess: async (response) => {
            if (!response) return;
            await loginWithToken(response.token);
        },
    });

    // ارسال مجدد کد یکبار مصرف (ورود/ثبت‌نام)
    async function resendOtp() {
        const response = await otpSend({ mobile });
        if (response) goToOtpStep("VERIFY_OTP");
    }

    // بازیابی رمز: ارسال کد
    const actionForgotSend = useMutation({
        mutationKey: ["forgot-send"],
        mutationFn: async (formData: any) => {
            setMobile(formData.mobile);
            return resetPasswordSendCode({ mobile: formData.mobile });
        },
        onSuccess: (response) => {
            if (!response) return;
            goToOtpStep("FORGOT_OTP");
        },
    });

    // بازیابی رمز: تایید کد
    const actionForgotVerify = useMutation({
        mutationKey: ["forgot-verify"],
        mutationFn: async (formData: any) =>
            resetPasswordVerifyCode({ mobile, code: formData.code }),
        onSuccess: (response) => {
            if (!response) return;
            setStep("RESET_PASSWORD");
        },
    });

    // بازیابی رمز: تعیین رمز جدید
    const actionResetPassword = useMutation({
        mutationKey: ["forgot-reset"],
        mutationFn: async (formData: any) =>
            resetPassword({
                mobile,
                password: formData.password,
                password_confirmation: formData.password_confirmation,
            }),
        onSuccess: async (response) => {
            if (!response) return;
            await loginWithToken(response.token);
        },
    });

    async function resendForgot() {
        const response = await resetPasswordSendCode({ mobile });
        if (response) goToOtpStep("FORGOT_OTP");
    }

    // ---- اجزای مشترک نمایش ----

    const Header = ({ title, subtitle }: { title: string; subtitle?: React.ReactNode }) => (
        <div className="flex flex-col items-center text-center gap-3">
            <Logo />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mt-4">
                {title}
            </h2>
            {subtitle && (
                <div className="text-sm leading-7 text-[#fcb415]">{subtitle}</div>
            )}
        </div>
    );

    const ResendRow = ({ onResend }: { onResend: () => void }) => (
        <div className="flex gap-x-2 items-center text-sm text-neutral-600 dark:text-neutral-300">
            {resendReady ? (
                <span className="text-green-600 cursor-pointer" onClick={onResend}>
                    ارسال مجدد کد
                </span>
            ) : (
                <>
                    <Counter
                        key={counterKey}
                        initialSeconds={RESEND_SECONDS}
                        end={() => setResendReady(true)}
                    />
                    <span>تا ارسال مجدد کد</span>
                </>
            )}
        </div>
    );

    const Terms = () => (
        <span className="block text-center text-xs text-neutral-600 dark:text-neutral-300">
            ورود شما به تجهیزلند به معنای پذیرش{" "}
            <Link href={"/page/rule"} className={"text-[#fcb415]"}>
                قوانین و مقررات
            </Link>{" "}
            سایت تجهیزلند هست
        </span>
    );

    return (
        <div className="nc-AuthFlow w-full">
            <div className="max-w-md mx-auto px-4 space-y-6">
                {/* مرحله ۱: وارد کردن شماره موبایل */}
                {step === "ENTER_MOBILE" && (
                    <>
                        <Header title="ورود یا ثبت‌نام در تجهیزلند" />
                        <form
                            className="grid grid-cols-1 gap-5"
                            onSubmit={handleSubmit((d) => actionCheck.mutateAsync(d))}
                        >
                            <span className="text-neutral-800 dark:text-neutral-200 text-sm">
                                لطفا شماره موبایل خود را وارد کنید
                            </span>
                            <Input
                                type="tel"
                                inputMode="numeric"
                                {...register("mobile")}
                                placeholder="09xxxxxxxxx"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <ButtonPrimary
                                type="submit"
                                className={buttonClass}
                                loading={actionCheck.isLoading}
                            >
                                ورود به تجهیزلند
                            </ButtonPrimary>
                        </form>
                        <Terms />
                    </>
                )}

                {/* کاربر موجود دارای رمز: وارد کردن رمز عبور */}
                {step === "ENTER_PASSWORD" && (
                    <>
                        <Header title="رمز عبور خود را وارد کنید" />
                        <div className="flex flex-col gap-1 text-sm">
                            <span
                                className="text-[#fcb415] cursor-pointer"
                                onClick={() => {
                                    setStep("FORGOT_MOBILE");
                                }}
                            >
                                رمزعبور خود را فراموش کردید ؟
                            </span>
                            <span
                                className="text-[#fcb415] cursor-pointer"
                                onClick={() => actionOtpLogin.mutate()}
                            >
                                ورود با رمز یکبار مصرف
                            </span>
                        </div>
                        <form
                            className="grid grid-cols-1 gap-5"
                            onSubmit={handleSubmit((d) => actionLogin.mutateAsync(d))}
                        >
                            <Input
                                type="password"
                                {...register("password")}
                                placeholder="رمز عبور"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <ButtonPrimary
                                type="submit"
                                className={buttonClass}
                                loading={actionLogin.isLoading || actionOtpLogin.isLoading}
                            >
                                ادامه
                            </ButtonPrimary>
                        </form>
                    </>
                )}

                {/* تایید کد یکبار مصرف (ورود/ثبت‌نام) */}
                {step === "VERIFY_OTP" && (
                    <>
                        <Header
                            title="کد تایید را وارد کنید"
                            subtitle="کد ارسال شده به شماره موبایل خود را وارد نمایید و سپس روی ادامه کلیک کنید"
                        />
                        <form
                            className="grid grid-cols-1 gap-5"
                            onSubmit={handleSubmit((d) => actionVerifyOtp.mutateAsync(d))}
                        >
                            <ResendRow onResend={resendOtp} />
                            <Input
                                type="tel"
                                inputMode="numeric"
                                {...register("code")}
                                placeholder="کد تایید"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <span
                                className="text-sm font-bold text-primary-700 cursor-pointer"
                                onClick={() => setStep("ENTER_MOBILE")}
                            >
                                اصلاح شماره
                            </span>
                            <ButtonPrimary
                                type="submit"
                                className={buttonClass}
                                loading={actionVerifyOtp.isLoading}
                            >
                                ادامه
                            </ButtonPrimary>
                        </form>
                    </>
                )}

                {/* تکمیل ثبت‌نام کاربر جدید */}
                {step === "COMPLETE_REGISTER" && (
                    <>
                        <Header
                            title="تکمیل ثبت‌نام"
                            subtitle="لطفا اطلاعات حساب کاربری خود را وارد کنید"
                        />
                        <form
                            className="grid grid-cols-1 gap-4"
                            onSubmit={handleSubmit((d) => actionRegister.mutateAsync(d))}
                        >
                            <Input
                                type="text"
                                {...register("name")}
                                placeholder="نام"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <Input
                                type="text"
                                {...register("last_name")}
                                placeholder="نام خانوادگی"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <Input
                                type="tel"
                                inputMode="numeric"
                                {...register("national_code")}
                                placeholder="کد ملی"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <Input
                                type="password"
                                {...register("password")}
                                placeholder="کلمه عبور"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <Input
                                type="password"
                                {...register("password_confirmation")}
                                placeholder="تکرار کلمه عبور"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <ButtonPrimary
                                type="submit"
                                className={buttonClass}
                                loading={actionRegister.isLoading}
                            >
                                ثبت‌نام
                            </ButtonPrimary>
                        </form>
                    </>
                )}

                {/* بازیابی رمز: وارد کردن شماره موبایل */}
                {step === "FORGOT_MOBILE" && (
                    <>
                        <Header
                            title="بازیابی رمز عبور"
                            subtitle="شماره موبایلی که قبلا با آن ثبت نام کرده اید را وارد نمایید و سپس روی ادامه کلیک کنید"
                        />
                        <form
                            className="grid grid-cols-1 gap-5"
                            onSubmit={handleSubmit((d) => actionForgotSend.mutateAsync(d))}
                        >
                            <Input
                                type="tel"
                                inputMode="numeric"
                                {...register("mobile")}
                                placeholder="09xxxxxxxxx"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <ButtonPrimary
                                type="submit"
                                className={buttonClass}
                                loading={actionForgotSend.isLoading}
                            >
                                ادامه
                            </ButtonPrimary>
                        </form>
                    </>
                )}

                {/* بازیابی رمز: تایید کد */}
                {step === "FORGOT_OTP" && (
                    <>
                        <Header
                            title="بازیابی رمز عبور"
                            subtitle="کد ارسال شده به شماره موبایل خود را وارد نمایید و سپس روی ادامه کلیک کنید"
                        />
                        <form
                            className="grid grid-cols-1 gap-5"
                            onSubmit={handleSubmit((d) => actionForgotVerify.mutateAsync(d))}
                        >
                            <ResendRow onResend={resendForgot} />
                            <Input
                                type="tel"
                                inputMode="numeric"
                                {...register("code")}
                                placeholder="کد بازیابی"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <ButtonPrimary
                                type="submit"
                                className={buttonClass}
                                loading={actionForgotVerify.isLoading}
                            >
                                ادامه
                            </ButtonPrimary>
                        </form>
                    </>
                )}

                {/* بازیابی رمز: تعیین رمز جدید */}
                {step === "RESET_PASSWORD" && (
                    <>
                        <Header
                            title="تعیین رمز عبور جدید"
                            subtitle="کلمه عبور باید حداقل ۸ حرف باشد"
                        />
                        <form
                            className="grid grid-cols-1 gap-4"
                            onSubmit={handleSubmit((d) => actionResetPassword.mutateAsync(d))}
                        >
                            <Input
                                type="password"
                                {...register("password")}
                                placeholder="کلمه عبور"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <Input
                                type="password"
                                {...register("password_confirmation")}
                                placeholder="تکرار کلمه عبور"
                                sizeClass={inputSizeClass}
                                rounded="rounded-xl"
                                className={inputClass}
                            />
                            <ButtonPrimary
                                type="submit"
                                className={buttonClass}
                                loading={actionResetPassword.isLoading}
                            >
                                ادامه
                            </ButtonPrimary>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthFlow;
