"use client";

import { useMemo, useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { LuCalendarDays, LuX } from "react-icons/lu";

type Props = {
    /** مقدار میلادی `YYYY-MM-DD` (یا خالی). */
    value?: string;
    onChange: (date: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
};

const JALALI_LIKE = /^1[34]\d{2}[/-]/;

/**
 * ورودی می‌تواند میلادیِ `YYYY-MM-DD` (خروجی خودِ همین کامپوننت) یا رشته‌ی شمسیِ
 * از قبل فرمت‌شده‌ی API (`1403/05/12 10:30`) باشد؛ هر دو به تاریخ شمسی تبدیل می‌شوند.
 */
const toDateObject = (value?: string) => {
    if (!value) return null;
    const datePart = String(value).trim().split(/[\sT]/)[0].replace(/-/g, "/");
    const jalali = JALALI_LIKE.test(datePart);
    const parsed = new DateObject({
        date: datePart,
        calendar: jalali ? persian : gregorian,
        locale: jalali ? persian_fa : gregorian_en,
        format: "YYYY/MM/DD",
    });
    if (!parsed.isValid) return null;
    return jalali ? parsed : parsed.convert(persian, persian_fa);
};

/**
 * انتخاب تاریخ شمسی که همیشه مقدار میلادی `YYYY-MM-DD` به بیرون می‌دهد؛
 * چون فیلترهای سمت سرور روی ستون تاریخ دیتابیس اعمال می‌شوند.
 */
const PersianDatePicker = ({ value, onChange, placeholder = "انتخاب تاریخ", disabled, className = "" }: Props) => {
    const [date, setDate] = useState<DateObject | null>(() => toDateObject(value));
    const [syncedValue, setSyncedValue] = useState(value);

    // مقدار کنترل‌شده از بیرون (مثلا پاک‌کردن همه‌ی فیلترها) باید در تقویم هم اعمال شود.
    // تنظیم state حین رندر — الگوی رسمی React برای واکنش به تغییر prop، بدون افکت.
    if (value !== syncedValue) {
        setSyncedValue(value);
        setDate(toDateObject(value));
    }

    const handleChange = (selected: DateObject | null) => {
        setDate(selected);
        if (!selected) {
            onChange("");
            return;
        }
        onChange(selected.convert(gregorian, gregorian_en).format("YYYY-MM-DD"));
    };

    const clear = () => {
        setDate(null);
        onChange("");
    };

    const inputClass = useMemo(
        () =>
            "block w-full min-w-[150px] h-11 ps-9 pe-8 py-2 text-sm text-slate-700 bg-white rounded-xl border " +
            "border-slate-200 outline-hidden transition-colors placeholder:text-slate-400 " +
            "hover:border-slate-300 focus:border-slate-400 focus:ring-3 focus:ring-slate-900/10 " +
            "disabled:bg-slate-100 disabled:text-slate-400",
        []
    );

    return (
        <div className={`relative w-full ${className}`}>
            <LuCalendarDays className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <DatePicker
                value={date}
                onChange={handleChange}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                editable={false}
                disabled={disabled}
                inputClass={inputClass}
                placeholder={placeholder}
                format="YYYY/MM/DD"
                className="custom-date-picker shrink-0"
                containerClassName="w-full"
            />
            {date && !disabled && (
                <button
                    type="button"
                    onClick={clear}
                    title="حذف تاریخ"
                    className="absolute end-2 top-1/2 -translate-y-1/2 w-6 h-6 inline-flex items-center justify-center rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                >
                    <LuX className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
};

export default PersianDatePicker;
