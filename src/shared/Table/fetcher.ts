import axios from "@/services/axios";
import { TableFetcher, TableParams } from "@/shared/Table/types";

export const buildTableQuery = ({ page, sort, filters }: TableParams): string => {
    const qp = new URLSearchParams();
    qp.append("page", String(page));
    if (sort) qp.append("sort", sort);
    Object.entries(filters || {}).forEach(([key, value]) => {
        if (value !== "" && value != null) {
            qp.append(`filter[${key}]`, value instanceof Date ? value.toISOString() : String(value));
        }
    });
    return qp.toString();
};

export const tableFetcher =
    <T,>(url: string): TableFetcher<T> =>
    (params) =>
        axios.get(`${url}?${buildTableQuery(params)}`).then((res) => res?.data?.result);
