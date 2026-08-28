"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LuArrowRight, LuSave } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";

type Props = {
    /** در حال ارسال فرم */
    loading?: boolean;
    disabled?: boolean;
    saveText?: string;
    backText?: string;
    /** اگر داده شود به جای برگشت در تاریخچه، به این آدرس می‌رود. */
    backHref?: string;
    /** برای فرم‌های داخل مودال: به جای پیمایش، مودال را می‌بندد. */
    onBack?: () => void;
    className?: string;
    /** دکمه‌های اضافی (مثلا «ذخیره و ارسال پیامک») سمت چپ دکمه ذخیره. */
    children?: React.ReactNode;
};

/** ردیف دکمه‌های پایانی همه‌ی فرم‌های ادمین: ذخیره + بازگشت. */
export default function FormActions({
    loading = false,
    disabled = false,
    saveText = "ذخیره",
    backText = "بازگشت",
    backHref,
    onBack,
    className = "",
    children,
}: Props) {
    const router = useRouter();

    const goBack = () => {
        if (onBack) return onBack();
        if (backHref) return router.push(backHref);
        router.back();
    };

    return (
        <div className={`flex flex-wrap items-center justify-center gap-3 my-5 ${className}`}>
            <ToolbarButton
                type="submit"
                loading={loading}
                disabled={disabled || loading}
                icon={<LuSave className="w-4 h-4" />}
            >
                {saveText}
            </ToolbarButton>
            {children}
            <ToolbarButton
                variant="secondary"
                onClick={goBack}
                icon={<LuArrowRight className="w-4 h-4" />}
            >
                {backText}
            </ToolbarButton>
        </div>
    );
}
