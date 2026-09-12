"use client";

import {faNumber, faPercent} from "@/components/Marketing/theme";

export type ShareSegment = {
    key: string;
    label: string;
    value: number;
    share: number;
    color: string;
};

/**
 * نمایش سهم (جزء از کل) به صورت یک نوار افقی انباشته.
 *
 * برای «سهم هر دستگاه» عمدا نمودار دایره‌ای نیست: مقایسه‌ی طول، از مقایسه‌ی زاویه
 * دقیق‌تر خوانده می‌شود و وقتی دو مقدار به هم نزدیک‌اند دایره عملا بی‌فایده است.
 *
 * بین قطعه‌ها ۲px فاصله‌ی سطحی هست تا مرز دو رنگ مجاور بدون اتکا به تفاوت رنگ هم دیده شود،
 * و برچسب فقط داخل قطعه‌های به‌قدر کافی پهن نوشته می‌شود تا متن بریده نشود؛ بقیه در
 * راهنمای زیر نوار عدد دقیقشان را دارند.
 */
export default function StackedShareBar({segments}: { segments: ShareSegment[] }) {
    if (!segments.length) {
        return <p className="py-6 text-sm text-center text-slate-500">داده‌ای برای این بازه ثبت نشده است.</p>;
    }

    const INLINE_LABEL_MIN_SHARE = 12;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex w-full h-11 gap-[2px] overflow-hidden rounded-lg">
                {segments.map((segment) => (
                    <div
                        key={segment.key}
                        className="flex items-center justify-center h-full min-w-[3px] first:rounded-s-lg last:rounded-e-lg transition-opacity hover:opacity-90"
                        style={{width: `${segment.share}%`, backgroundColor: segment.color}}
                        title={`${segment.label}: ${faNumber(segment.value)} بازدید (${faPercent(segment.share)})`}
                    >
                        {segment.share >= INLINE_LABEL_MIN_SHARE && (
                            <span className="px-2 text-xs font-bold text-white whitespace-nowrap">
                                {segment.label} {faPercent(segment.share)}
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {segments.map((segment) => (
                    <li key={segment.key} className="flex items-center gap-2 text-sm">
                        <span className="w-3 h-3 rounded-sm shrink-0" style={{backgroundColor: segment.color}}/>
                        <span className="text-slate-600">{segment.label}</span>
                        <span className="text-slate-800 font-medium tabular-nums">{faPercent(segment.share)}</span>
                        <span className="text-slate-400 text-xs tabular-nums">({faNumber(segment.value)})</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
