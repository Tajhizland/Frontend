import {CartResponse} from "@/services/types/cart";

/**
 * نگهداری سبد خرید کاربر مهمان (لاگین‌نشده) روی localStorage مرورگر.
 * منبع حقیقت برای کاربر مهمان همین استوریج است و state سراسری از روی آن هیدریت می‌شود.
 */
const STORAGE_KEY = "guest_cart";

export function loadGuestCart(): CartResponse[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as CartResponse[]) : [];
    } catch {
        return [];
    }
}

export function saveGuestCart(cart: CartResponse[]): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
        // در صورت پر بودن استوریج یا خطای سریالایز، بی‌صدا عبور می‌کنیم
    }
}

export function clearGuestCart(): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.removeItem(STORAGE_KEY);
    } catch {
        // ignore
    }
}
