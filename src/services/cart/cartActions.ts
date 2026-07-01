import {getCookie} from "cookies-next";
import {
    getGlobalState,
    reduxAddToCart,
    reduxDecrementQuantity,
    reduxIncrementQuantity,
    reduxRemoveFromCart,
    setCart,
} from "@/services/globalState/GlobalState";
import {
    addToCart,
    decreaseCartItem,
    getCart,
    increaseCartItem,
    mergeCart,
    removeCartItem,
} from "@/services/api/shop/cart";
import {clearGuestCart, loadGuestCart, saveGuestCart} from "@/services/cart/guestCart";
import {ProductResponse} from "@/services/types/product";
import {ColorResponse} from "@/services/types/color";
import {GuarantyResponse} from "@/services/types/guaranty";

/**
 * لایه‌ی واحد عملیات سبد خرید.
 *
 * تمام کامپوننت‌ها فقط از این توابع استفاده می‌کنند و نیازی نیست بدانند کاربر
 * لاگین کرده یا مهمان است:
 *  - کاربر لاگین‌کرده  → عملیات روی API انجام و سپس state سراسری به‌روز می‌شود.
 *  - کاربر مهمان        → عملیات روی state سراسری انجام و روی localStorage ذخیره می‌شود.
 */

export function isLoggedIn(): boolean {
    return !!getCookie("token");
}

function persistGuestCart(): void {
    saveGuestCart(getGlobalState("cart"));
}

export async function addItemToCart(
    product: ProductResponse,
    count: number,
    color: ColorResponse,
    guaranty?: GuarantyResponse,
): Promise<boolean> {
    if (isLoggedIn()) {
        const response = await addToCart({
            productColorId: color.id,
            count,
            guaranty_id: guaranty?.id ?? undefined,
        });
        if (!response?.success) return false;
        reduxAddToCart(product, count, color, guaranty);
        return true;
    }

    reduxAddToCart(product, count, color, guaranty);
    persistGuestCart();
    return true;
}

export async function increaseItem(colorId: number, guarantyId?: number): Promise<boolean> {
    if (isLoggedIn()) {
        const response = await increaseCartItem({productColorId: colorId, guaranty_id: guarantyId});
        if (!response?.success) return false;
        reduxIncrementQuantity(colorId, guarantyId);
        return true;
    }

    reduxIncrementQuantity(colorId, guarantyId);
    persistGuestCart();
    return true;
}

export async function decreaseItem(colorId: number, guarantyId?: number): Promise<boolean> {
    if (isLoggedIn()) {
        const response = await decreaseCartItem({productColorId: colorId, guaranty_id: guarantyId});
        if (!response?.success) return false;
        reduxDecrementQuantity(colorId, guarantyId);
        return true;
    }

    reduxDecrementQuantity(colorId, guarantyId);
    persistGuestCart();
    return true;
}

export async function removeItem(colorId: number, guarantyId?: number): Promise<boolean> {
    if (isLoggedIn()) {
        const response = await removeCartItem({productColorId: colorId, guaranty_id: guarantyId});
        if (!response?.success) return false;
        reduxRemoveFromCart(colorId, guarantyId);
        return true;
    }

    reduxRemoveFromCart(colorId, guarantyId);
    persistGuestCart();
    return true;
}

/**
 * هیدریت سبد خرید مهمان از روی localStorage هنگام بارگذاری برنامه.
 * برای کاربر لاگین‌کرده کاری انجام نمی‌دهد (سبد او از API می‌آید).
 */
export function hydrateGuestCart(): void {
    if (isLoggedIn()) return;
    setCart(loadGuestCart());
}

/**
 * پس از ورود موفق: اگر سبد مهمانی وجود داشت با endpoint مرج ادغام می‌شود،
 * استوریج پاک و سبد نهاییِ ادغام‌شده از API دریافت و در state قرار می‌گیرد.
 */
export async function syncCartAfterLogin(): Promise<void> {
    const guestCart = loadGuestCart();

    if (guestCart.length > 0) {
        const items = guestCart
            .map((item) => ({
                productColorId: Number(item.color.id),
                count: item.count,
                guaranty_id: item.guaranty?.id ?? undefined,
            }))
            .filter((item) => Number.isInteger(item.productColorId) && item.count > 0);

        try {
            if (items.length > 0) {
                await mergeCart({items});
            }
        } finally {
            clearGuestCart();
        }
    }

    const merged = await getCart();
    setCart(merged ?? []);
}
