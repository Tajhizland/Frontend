import React from "react";

/**
 * نوار عملیات بالای صفحه (ایجاد، سورت، …).
 * `Panel` این بخش را کنار `PageTitle` در هدر ثابت صفحه می‌نشاند تا جای دکمه‌ها
 * در همه‌ی صفحات ادمین یکسان باشد.
 */
export default function PageLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <div className={`flex flex-wrap items-center gap-2 ${className}`}>{children}</div>;
}
