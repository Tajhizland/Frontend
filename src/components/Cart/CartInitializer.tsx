"use client";

import {useEffect} from "react";
import {hydrateGuestCart} from "@/services/cart/cartActions";

/**
 * سبد خرید مهمان را هنگام بارگذاری برنامه از localStorage بازیابی می‌کند.
 * برای کاربر لاگین‌کرده کاری انجام نمی‌دهد.
 */
export default function CartInitializer() {
    useEffect(() => {
        hydrateGuestCart();
    }, []);

    return null;
}
