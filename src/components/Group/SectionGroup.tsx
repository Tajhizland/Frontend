"use client"
import React, { useMemo, useState } from 'react';
import {GroupProductResponse} from "@/services/types/groupProduct";
import {ProductResponse} from "@/services/types/product";

type Props = {
    groupItems: { data: GroupProductResponse[] };
};

export default function SectionGroup({ groupItems }: Props) {
    const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    // استخراج titleها
    const uniqueTitles = useMemo(() => {
        const titles = groupItems.data.flatMap(item =>
            item.value?.data.map(val => val.groupField?.title).filter(Boolean) ?? []
        );
        return Array.from(new Set(titles));
    }, [groupItems]);

    // استخراج valueها
    const uniqueValues = useMemo(() => {
        const values = groupItems.data.flatMap(item =>
            item.value?.data.map(val => val.value).filter(Boolean) ?? []
        );
        return Array.from(new Set(values));
    }, [groupItems]);

    // فیلتر محصولات بر اساس انتخاب
    const filteredProducts = useMemo(() => {
        return groupItems.data
            .filter(item =>
                item.value?.data.some(val =>
                    (!selectedTitle || val.groupField?.title === selectedTitle) &&
                    (!selectedValue || val.value === selectedValue)
                )
            )
            .map(item => item.product)
            .filter(Boolean) as ProductResponse[];
    }, [groupItems, selectedTitle, selectedValue]);

    return (
        <div className="p-4 space-y-4">
            <div className="space-y-2">
                <label className="block font-bold">عنوان ویژگی (title):</label>
                <select
                    className="border p-2 rounded w-full"
                    value={selectedTitle ?? ''}
                    onChange={(e) => setSelectedTitle(e.target.value || null)}
                >
                    <option value="">همه</option>
                    {uniqueTitles.map(title => (
                        <option key={title} value={title}>{title}</option>
                    ))}
                </select>
            </div>

            <div className="space-y-2">
                <label className="block font-bold">مقدار ویژگی (value):</label>
                <select
                    className="border p-2 rounded w-full"
                    value={selectedValue ?? ''}
                    onChange={(e) => setSelectedValue(e.target.value || null)}
                >
                    <option value="">همه</option>
                    {uniqueValues.map(value => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                </select>
            </div>

            <div>
                <h3 className="font-bold mt-4">محصولات مرتبط:</h3>
                {filteredProducts.length === 0 ? (
                    <p className="text-gray-500">محصولی یافت نشد.</p>
                ) : (
                    <ul className="list-disc pl-5">
                        {filteredProducts.map(product => (
                            <li key={product.id}>{product.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
