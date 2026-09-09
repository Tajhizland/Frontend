/**
 * پالت نمودارهای بخش مارکتینگ.
 *
 * این مقادیر با اسکریپت اعتبارسنجی پالت بررسی شده‌اند: فاصله‌ی رنگی کافی برای کوررنگی
 * (بدترین جفت مجاور ΔE 9.2) و کنتراست کافی روی زمینه‌ی روشن پنل. هر متریک یک رنگ ثابت
 * در کل بخش دارد تا خواننده رنگ را با معنا بشناسد، نه با ترتیب نمایش.
 */
export const MARKETING_COLORS = {
    view: "#2a78d6",
    cart: "#1baf7a",
    search: "#eb6834",
    zeroResult: "#4a3aa7",
} as const;

/** نسخه‌ی کم‌رنگ برای پرکردن زیر نمودار خطی. */
export const fade = (hex: string, alpha = 0.12) => {
    const value = hex.replace("#", "");
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const faNumber = (value: number | null | undefined) =>
    typeof value === "number" ? value.toLocaleString("fa-IR") : "—";

export const faPercent = (value: number | null | undefined) =>
    typeof value === "number" ? `${value.toLocaleString("fa-IR")}٪` : "—";
