"use client";
import React, { useMemo, useState } from "react";
import { GroupProductResponse } from "@/services/types/groupProduct";
import { ProductResponse } from "@/services/types/product";

type Props = {
    groupItems: GroupProductResponse[];
};

export default function ProductGroupFilter({ groupItems }: Props) {
    const [selectedValues, setSelectedValues] = useState<Record<string, string | null>>({});

    // گروه‌بندی titleها به همراه valueهای آن‌ها
    const groupedFields = useMemo(() => {
        const map = new Map<string, Set<string>>();
        groupItems.forEach((item) => {
            item.value?.data.forEach((val) => {
                const title = val.groupField?.title;
                const value = val.value;
                if (title && value) {
                    if (!map.has(title)) {
                        map.set(title, new Set());
                    }
                    map.get(title)?.add(value);
                }
            });
        });
        return map;
    }, [groupItems]);

    // فیلتر محصولات بر اساس selectedValues
    const filteredProducts: ProductResponse[] = useMemo(() => {
        return groupItems
            .filter((item) => {
                const itemValues = item.value?.data ?? [];
                return Object.entries(selectedValues).every(([title, selectedVal]) => {
                    if (!selectedVal) return true;
                    return itemValues.some(
                        (val) => val.groupField?.title === title && val.value === selectedVal
                    );
                });
            })
            .map((item) => item.product)
            .filter(Boolean) as ProductResponse[];
    }, [groupItems, selectedValues]);

    const handleSelectValue = (title: string, value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            [title]: prev[title] === value ? null : value,
        }));
    };

    return (
        <div className="space-y-6 p-4">
            {[...groupedFields.entries()].map(([title, values]) => (
                <div key={title}>
                    <h4 className="font-bold mb-2">{title}</h4>
                    <div className="flex flex-wrap gap-2">
                        {[...values].map((value) => {
                            const isSelected = selectedValues[title] === value;
                            return (
                                <button
                                    key={value}
                                    className={`px-3 py-1 border rounded-full text-sm transition ${
                                        isSelected
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                    onClick={() => handleSelectValue(title, value)}
                                >
                                    {value}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* نمایش محصولات فیلتر شده */}
            <div>
                <h3 className="font-bold mt-6">محصولات مرتبط:</h3>
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500 mt-2">محصولی یافت نشد.</p>
                ) : (
                    <ul className="list-disc pl-5 mt-2">
                        {filteredProducts.map((product) => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
