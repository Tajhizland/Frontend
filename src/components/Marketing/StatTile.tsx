import React from "react";

type Props = {
    label: string;
    value: React.ReactNode;
    hint?: React.ReactNode;
    icon?: React.ReactNode;
    /** رنگ نشانگر کنار عدد؛ هویت متریک را حمل می‌کند، نه خودِ متن را. */
    accent?: string;
};

/**
 * یک عدد سرخطی. برای «چند تا؟» نمودار لازم نیست و همین کاشی خواناتر است؛
 * ضمنا نقش برچسب عددیِ صریح را برای نمودارهای کنارش بازی می‌کند.
 */
export default function StatTile({label, value, hint, icon, accent}: Props) {
    return (
        <div className="flex items-start gap-3 p-4 bg-white border border-slate-200/80 rounded-2xl">
            {accent && <span className="mt-1.5 w-1 h-8 rounded-full shrink-0" style={{backgroundColor: accent}}/>}
            <div className="flex flex-col gap-1 min-w-0">
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    {icon}
                    {label}
                </span>
                <span className="text-2xl font-bold text-slate-800">{value}</span>
                {hint && <span className="text-xs text-slate-500">{hint}</span>}
            </div>
        </div>
    );
}
