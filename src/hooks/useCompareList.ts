"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { ProductResponse } from "@/services/types/product";

const MAX_DESKTOP = 3;
const MAX_MOBILE = 2;

export const useCompareList = () => {
    const [items, setItems] = useState<ProductResponse[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const has = (product: ProductResponse) => items.some((item) => item.id === product.id);

    const toggle = (product: ProductResponse) => {
        if (has(product)) {
            setItems(items.filter((item) => item.id !== product.id));
            return;
        }

        const max = typeof window !== "undefined" && window.innerWidth <= 768 ? MAX_MOBILE : MAX_DESKTOP;
        if (items.length >= max) {
            toast.error(`امکان مقایسه بیش از ${max} محصول با هم وجود ندارد`);
            return;
        }

        setItems([...items, product]);
    };

    return {
        items,
        setItems,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
        toggle,
        has,
        clear: () => setItems([]),
    };
};
