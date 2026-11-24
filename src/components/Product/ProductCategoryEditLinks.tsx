"use client";

import Link from "next/link";
import {ArrowTopRightOnSquareIcon} from "@heroicons/react/24/outline";
import {useQuery} from "@tanstack/react-query";
import {categoryList} from "@/services/api/admin/category";
import type {ProductResponse} from "@/services/types/product";

export default function ProductCategoryEditLinks({product, type}: {
    product?: Pick<ProductResponse, "category_id" | "category_ids" | "category">;
    type: "filter" | "option";
}) {
    const categoryIds = [...new Set(product?.category_ids?.length
        ? product.category_ids : product?.category_id ? [product.category_id] : [])];
    const {data: categories} = useQuery({
        queryKey: ["category-list"],
        queryFn: () => categoryList(),
        enabled: categoryIds.length > 1,
        staleTime: 5000,
    });
    if (!categoryIds.length) return null;

    const title = type === "filter" ? "ویرایش فیلتر دسته‌بندی" : "ویرایش ویژگی دسته‌بندی";
    return (
        <div className="my-5 flex flex-wrap gap-3">
            {categoryIds.map(categoryId => {
                const name = categories?.data.find(category => category.id === categoryId)?.name
                    || (categoryId === product?.category_id ? product.category : "")
                    || `دسته‌بندی ${categoryId}`;
                return (
                    <Link key={categoryId} href={`/admin/category/${type}/${categoryId}`}
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-primary-500 px-3 py-2 text-sm text-primary-6000 hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-primary-500 dark:text-primary-400 dark:hover:bg-neutral-800">
                        {title}{categoryIds.length > 1 ? ` — ${name}` : ""}
                        <ArrowTopRightOnSquareIcon className="h-4 w-4 shrink-0" aria-hidden="true"/>
                        <span className="sr-only">(در تب جدید)</span>
                    </Link>
                );
            })}
        </div>
    );
}
