"use client";

import React, {useEffect, useMemo} from "react";
import {LuImagePlus, LuX} from "react-icons/lu";

type Props = {
    name: string;
    value: File[];
    onChange: (files: File[]) => void;
    /** پیام راهنما زیر دکمه‌ی انتخاب */
    hint?: string;
};

const ACCEPT = "image/jpeg,image/png,image/webp,video/mp4,video/quicktime";

/**
 * انتخاب چندتایی فایل برای یک پست، با پیش‌نمایش و امکان حذف قبل از آپلود.
 * ترتیب نمایش همان ترتیبی است که به سرور می‌رود و کاروسل با آن ساخته می‌شود.
 */
export default function MediaPicker({name, value, onChange, hint}: Props) {
    const previews = useMemo(() => value.map((file) => URL.createObjectURL(file)), [value]);

    // ObjectURL ها باید آزاد شوند وگرنه با هر انتخاب، حافظه‌ی تب بالا می‌رود
    useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

    const totalSize = useMemo(
        () => value.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024),
        [value]
    );

    const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = Array.from(event.target.files ?? []);
        if (!selected.length) return;
        onChange([...value, ...selected]);
        // ریست ورودی تا انتخاب دوباره‌ی همان فایل هم رویداد بدهد
        event.target.value = "";
    };

    const removeAt = (index: number) => onChange(value.filter((_, i) => i !== index));

    return (
        <div className="flex flex-col gap-4">
            <label
                htmlFor={name}
                className="flex flex-col items-center justify-center gap-2 p-6 w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:border-slate-400"
            >
                <LuImagePlus className="w-7 h-7 text-slate-500"/>
                <span className="text-sm font-semibold text-slate-600">انتخاب تصویر یا ویدیو</span>
                <span className="text-xs text-slate-400">{hint ?? "می‌توانید چند فایل را با هم انتخاب کنید"}</span>
                <input id={name} type="file" multiple accept={ACCEPT} className="hidden" onChange={handleSelect}/>
            </label>

            {value.length > 0 && (
                <>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {value.map((file, index) => (
                            <div key={`${file.name}-${index}`}
                                 className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-black">
                                {file.type.startsWith("video/") ? (
                                    <video src={previews[index]} className="w-full h-full object-contain"
                                           muted playsInline preload="metadata"/>
                                ) : (
                                    // پیش‌نمایش محلی است و از next/image بهره‌ای نمی‌برد
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={previews[index]} alt={file.name}
                                         className="w-full h-full object-contain"/>
                                )}
                                <span
                                    className="absolute top-1 start-1 rounded-md bg-black/60 px-1.5 text-[11px] text-white">
                                    {index + 1}
                                </span>
                                <button type="button" onClick={() => removeAt(index)}
                                        title="حذف"
                                        className="absolute top-1 end-1 rounded-full bg-rose-600 p-1 text-white hover:bg-rose-700">
                                    <LuX className="w-3 h-3"/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500">
                        {value.length} فایل انتخاب شده — مجموعاً {totalSize.toFixed(1)} مگابایت
                    </p>
                </>
            )}
        </div>
    );
}
