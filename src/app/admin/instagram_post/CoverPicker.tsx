"use client";

import React, {useEffect, useId, useMemo} from "react";
import toast from "react-hot-toast";
import {LuImagePlus, LuX} from "react-icons/lu";

type Props = {
    value?: File | null;
    image?: string;
    onChange: (cover: File | null) => void;
    disabled?: boolean;
};

export default function CoverPicker({value, image, onChange, disabled}: Props) {
    const id = useId();
    const preview = useMemo(() => value ? URL.createObjectURL(value) : undefined, [value]);
    useEffect(() => () => {
        if (preview) URL.revokeObjectURL(preview);
    }, [preview]);
    const src = preview ?? image;

    return (
        <div className="space-y-2 text-start" onPointerDown={(event) => event.stopPropagation()}
             onKeyDown={(event) => event.stopPropagation()}>
            <span className="block text-xs font-medium text-slate-700">کاور ویدیو</span>
            {src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt="پیش‌نمایش کاور ویدیو" className="aspect-square w-full rounded-lg object-cover"/>
            )}
            <label htmlFor={id}
                   className={`flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-slate-300 px-2 py-2 text-xs text-slate-700 focus-within:ring-2 focus-within:ring-sky-500 ${disabled ? "pointer-events-none opacity-50" : "hover:bg-slate-50"}`}>
                <LuImagePlus className="h-4 w-4 shrink-0"/>
                {disabled ? "در حال آپلود…" : src ? "تغییر کاور" : "انتخاب کاور"}
                <input id={id} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only"
                       disabled={disabled} onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (!file) return;
                    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
                        toast.error("کاور باید تصویر JPG، PNG یا WebP باشد.");
                        return;
                    }
                    if (file.size > 5 * 1024 * 1024) {
                        toast.error("حجم کاور نباید بیشتر از ۵ مگابایت باشد.");
                        return;
                    }
                    onChange(file);
                }}/>
            </label>
            {value && (
                <button type="button" disabled={disabled} onClick={() => onChange(null)}
                        className="flex items-center gap-1 text-xs text-rose-600">
                    <LuX className="h-3 w-3"/> حذف کاور انتخاب‌شده
                </button>
            )}
            <p className="text-[11px] leading-5 text-slate-500">JPG، PNG یا WebP تا ۵ مگابایت؛ تصویر نمای اکسپلور.</p>
        </div>
    );
}
