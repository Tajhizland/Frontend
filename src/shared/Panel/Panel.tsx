import React from "react";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";

/**
 * `PageTitle` و `PageLink` هرجای پنل که نوشته شده باشند به یک هدر واحد منتقل
 * می‌شوند: عنوان سمت راست، دکمه‌های عملیات سمت چپ. این کار جای دکمه‌های بالای
 * جدول‌ها را در کل پنل ادمین یکسان می‌کند.
 */
export default function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
    const items = React.Children.toArray(children);

    const title = items.find((child) => React.isValidElement(child) && child.type === PageTitle);
    const toolbar = items.find((child) => React.isValidElement(child) && child.type === PageLink);
    const rest = items.filter((child) => child !== title && child !== toolbar);

    return (
        <div
            className={`p-4 sm:p-5 my-2 mx-2 bg-white border border-slate-200/80 rounded-2xl shadow-xs flex flex-col gap-y-4 ${
                className ?? ""
            }`}
        >
            {(title || toolbar) && (
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    {title ?? <span />}
                    {toolbar}
                </div>
            )}
            {rest}
        </div>
    );
}
