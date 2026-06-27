import axios from "@/services/axios";
import { TableFetcher, TableParams } from "@/shared/Table/types";

/** ساخت query string استاندارد جدول (page / sort / filter[...]) */
export const buildTableQuery = ({ page, sort, filters }: TableParams): string => {
    const qp = new URLSearchParams();
    qp.append("page", String(page));
    if (sort) qp.append("sort", sort);
    Object.entries(filters || {}).forEach(([key, value]) => {
        if (value) {
            qp.append(`filter[${key}]`, value instanceof Date ? value.toISOString() : value);
        }
    });
    return qp.toString();
};

/**
 * از روی یک آدرس، یک تابع fetcher آماده برای <Table> می‌سازد.
 * در فایل‌های api می‌توانی بنویسی:
 *   export const brandTable = tableFetcher<BrandResponse>("admin/brand/dataTable");
 * و بعد در صفحه: <Table fetcher={brandTable} ... />
 */
export const tableFetcher =
    <T,>(url: string): TableFetcher<T> =>
    (params) =>
        axios.get(`${url}?${buildTableQuery(params)}`).then((res) => res?.data?.result);
