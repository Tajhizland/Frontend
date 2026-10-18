export const instagramAvatarUrl = (file: string | null): string | undefined =>
    file ? `${(process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? "").replace(/\/+$/, "")}/instagram/${file}` : undefined;

/** برای حفظ سازگاری لینک‌های اشتراک‌گذاری قدیمی */
export const POST_QUERY_PARAM = "post";

const origin = () =>
    process.env.NEXT_PUBLIC_WEBSITE_URL || (typeof window !== "undefined" ? window.location.origin : "");

export const instagramPostPath = (id: number | string) => `/instagram/${id}`;

export const instagramPostLink = (id: number) =>
    `${origin().replace(/\/+$/, "")}${instagramPostPath(id)}`;

/**
 * زمان انتشار به سبک اینستاگرام. برای پست‌های قدیمی‌تر از یک ماه،
 * تاریخ شمسیِ آماده‌ای که سرور فرستاده نمایش داده می‌شود.
 */
export const relativeTime = (timestamp: number | null, fallback: string): string => {
    if (!timestamp) return fallback;

    const seconds = Math.floor(Date.now() / 1000) - timestamp;
    if (seconds < 60) return "همین الان";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes.toLocaleString("fa-IR")} دقیقه پیش`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours.toLocaleString("fa-IR")} ساعت پیش`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days.toLocaleString("fa-IR")} روز پیش`;

    const weeks = Math.floor(days / 7);
    if (weeks < 5) return `${weeks.toLocaleString("fa-IR")} هفته پیش`;

    return fallback;
};
