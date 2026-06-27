"use client";

import React, {useEffect, useState} from "react";
import {LuImagePlus, LuX} from "react-icons/lu";

type Props = {
    /** آدرس کامل تصویرِ فعلی (در حالت ویرایش) */
    previousSrc?: string;
    /** فایل جدید انتخاب‌شده — مقدار کنترل‌شده‌ی RHF */
    value?: File | null;
    onChange?: (file: File | null) => void;
    onBlur?: () => void;
    name?: string;
    disabled?: boolean;
    accept?: string;
};

/**
 * فیلد آپلود تصویر با مدیریت تمیزِ حالت‌ها:
 *  - تصویر فعلی (قبلی) را نشان می‌دهد
 *  - با انتخاب فایل جدید، یک preview موقت (temp) می‌سازد و برچسب «تصویر جدید» می‌زند
 *  - امکان حذف فایل جدید و بازگشت به تصویر فعلی
 *  - حافظه‌ی objectURL را آزاد می‌کند (بدون نشت حافظه)
 */
export default function ImageField({
    previousSrc,
    value,
    onChange,
    onBlur,
    name,
    disabled,
    accept = "image/*",
}: Props) {
    const [tempUrl, setTempUrl] = useState<string | null>(null);

    useEffect(() => {
        if (value instanceof File && value.type.startsWith("image/")) {
            const url = URL.createObjectURL(value);
            setTempUrl(url);
            return () => URL.revokeObjectURL(url);
        }
        setTempUrl(null);
    }, [value]);

    const isNewFile = value instanceof File;
    const showSrc = tempUrl ?? (!isNewFile ? previousSrc : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.files?.[0] ?? null);
    };

    return (
        <div className="flex flex-col items-center w-full gap-2">
            <label
                htmlFor={name}
                className="flex flex-col items-center justify-center p-4 w-full min-h-[9rem] border-2 border-dashed border-neutral-300 rounded-2xl cursor-pointer bg-neutral-50 hover:bg-neutral-100 transition-colors"
            >
                {showSrc ? (
                    <div className="flex flex-col items-center gap-2">
                        {/* از img ساده استفاده می‌شود تا blob موقت و آدرس remote هر دو بدون تنظیم دامنه کار کنند */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={showSrc}
                            alt="preview"
                            className="object-contain rounded-xl border border-neutral-200 max-h-40 w-auto"
                        />
                        <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                                isNewFile ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                            }`}
                        >
                            {isNewFile ? `تصویر جدید: ${value?.name}` : "تصویر فعلی"}
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-neutral-500">
                        <LuImagePlus className="w-8 h-8 mb-2" />
                        <span className="text-xs font-semibold">برای آپلود تصویر کلیک کنید</span>
                    </div>
                )}
                <input
                    id={name}
                    name={name}
                    type="file"
                    accept={accept}
                    disabled={disabled}
                    className="hidden"
                    onChange={handleChange}
                    onBlur={onBlur}
                />
            </label>
            {isNewFile && (
                <button
                    type="button"
                    onClick={() => onChange?.(null)}
                    className="inline-flex items-center gap-1 text-xs text-rose-600 hover:underline"
                >
                    <LuX className="w-3.5 h-3.5" />
                    حذف تصویر جدید
                </button>
            )}
        </div>
    );
}
