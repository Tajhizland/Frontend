"use client";

import PersianDatePicker from "@/shared/DatePicker/PersianDatePicker";
import Panel from "@/shared/Panel/Panel";

export type ReportPeriod = { fromDate: string; toDate: string };

type Props = {
    value: ReportPeriod;
    onChange: (period: ReportPeriod) => void;
};

/**
 * فیلتر بازه‌ی مشترک همه‌ی گزارش‌های مارکتینگ؛ در یک ردیف بالای نمودارها می‌نشیند
 * تا هر صفحه بازه‌ی خودش را جدا تعریف نکند. خالی‌گذاشتن یعنی ۳۰ روز اخیر.
 */
export default function ReportPeriodFilter({value, onChange}: Props) {
    return (
        <Panel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500">از تاریخ</label>
                    <PersianDatePicker
                        value={value.fromDate}
                        onChange={(date) => onChange({...value, fromDate: date})}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500">تا تاریخ</label>
                    <PersianDatePicker
                        value={value.toDate}
                        onChange={(date) => onChange({...value, toDate: date})}
                    />
                </div>
            </div>
            <p className="text-xs text-slate-500">اگر تاریخی انتخاب نشود، گزارش‌ها ۳۰ روز اخیر را نشان می‌دهند.</p>
        </Panel>
    );
}
