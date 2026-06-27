import { defineColumns, defineActions } from "@/shared/Table/types";
import { HiMiniPencil } from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import { ProductResponse } from "@/services/types/product";
import { BsCoin } from "react-icons/bs";

export const columns = defineColumns<ProductResponse>([
    { key: "id", header: "شناسه" },
    { key: "name", header: "نام محصول", editable: true },
    { key: "view", header: "تعداد بازدید" },
    { key: "url", header: "آدرس محصول", editable: true },
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
            row.status == 1 ? <Badge name={"فعال"} color={"green"} /> : <Badge name={"غیر‌‌فعال"} color={"red"} />,
    },
    { key: "category", header: "دسته محصول", editable: true },
    { key: "brand_name", header: "برند محصول", editable: true },
    { key: "created_at", header: "تاریخ ایجاد" },
]);

export const actions = defineActions<ProductResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"} />,
        href: (row) => `product/edit/${row.id}`,
    },
    {
        label: <BsCoin className={"text-black w-5 h-5"} title={"ویرایش قیمت"} />,
        href: (row) => `product/color/${row.id}`,
    },
    {
        label: <BsCoin className={"text-black w-5 h-5"} title={"ویرایش قیمت"} />,
        onClick: (row) => {
            console.log(row.id);
        },
    },
]);
