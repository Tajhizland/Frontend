import { defineColumns, defineActions } from "@/shared/Table/types";
import { HiMiniPencil } from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import { CategoryResponse } from "@/services/types/category";

export const columns = defineColumns<CategoryResponse>([
    { key: "id", header: "شناسه" },
    { key: "name", header: "نام دسته‌بندی", editable: true },
    { key: "url", header: "آدرس دسته‌بندی", editable: true },
    {
        key: "status",
        header: "وضعیت",
        editable: true,
        filter: "select",
        options: [
            { label: "فعال", value: 1 },
            { label: "غیر فعال", value: 0 },
        ],
        render: (row) =>
            Number(row.status) === 1 ? <Badge name={"فعال"} color={"green"} /> : <Badge name={"غیر‌‌فعال"} color={"red"} />,
    },
]);

export const actions = defineActions<CategoryResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"} />,
        href: (row) => `category/edit/${row.id}`,
    },
]);
