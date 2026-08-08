"use client";

import React, {createContext, useContext, useMemo, useState} from "react";

type ProductColorContextValue = {
    selectedColorId: number | null;
    setSelectedColorId: (id: number | null) => void;
};

const ProductColorContext = createContext<ProductColorContextValue | null>(null);

/**
 * رنگ انتخاب‌شده‌ی محصول را بین سایدبار (جایی که رنگ انتخاب می‌شود)
 * و گالری تصاویر (جایی که تصویر مرتبط با رنگ باید فعال شود) مشترک می‌کند.
 */
export function ProductColorProvider(
    {defaultColorId = null, children}: { defaultColorId?: number | null; children: React.ReactNode }
) {
    const [selectedColorId, setSelectedColorId] = useState<number | null>(defaultColorId);

    const value = useMemo(
        () => ({selectedColorId, setSelectedColorId}),
        [selectedColorId]
    );

    return (
        <ProductColorContext.Provider value={value}>
            {children}
        </ProductColorContext.Provider>
    );
}

/**
 * در صورت نبودِ Provider مقدار null برمی‌گرداند تا کامپوننت‌هایی که
 * بیرون از صفحه‌ی محصول استفاده می‌شوند (مثل صفحه‌ی گروه) بدون خطا کار کنند.
 */
export function useProductColorContext(): ProductColorContextValue | null {
    return useContext(ProductColorContext);
}
