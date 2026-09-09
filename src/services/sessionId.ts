const STORAGE_KEY = "visitor_session_id";

/**
 * شناسه‌ی پایدارِ مرورگر برای گزارش‌های مارکتینگ.
 *
 * فقط برای تفکیک بازدیدکننده‌ها در آمار است و هیچ داده‌ی هویتی در آن نیست؛ بدون این شناسه،
 * کاربران مهمانِ پشت یک آی‌پی مشترک همه یک نفر شمرده می‌شدند.
 */
export function getSessionId(): string | null {
    if (typeof window === "undefined") return null;

    try {
        const existing = window.localStorage.getItem(STORAGE_KEY);
        if (existing) return existing;

        const generated =
            window.crypto?.randomUUID?.() ??
            `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
        window.localStorage.setItem(STORAGE_KEY, generated);
        return generated;
    } catch {
        // حالت private browsing یا استوریج پر: آمار بدون شناسه‌ی نشست هم کار می‌کند
        return null;
    }
}
