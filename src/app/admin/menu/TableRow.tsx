import { defineColumns, defineActions } from "@/shared/Table/types";
import { HiMiniPencil } from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import { MenuResponse } from "@/services/types/menu";

export const columns = defineColumns<MenuResponse>([
    { key: "id", header: "شناسه" },
    { key: "title", header: "عنوان", editable: true },
    { key: "url", header: "آدرس", editable: true },
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
    { key: "created_at", header: "تاریخ ایجاد" },
]);

export const actions = defineActions<MenuResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"} />,
        href: (row) => `menu/edit/${row.id}`,
    },
]);
