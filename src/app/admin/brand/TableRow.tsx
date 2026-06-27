import { defineColumns, defineActions } from "@/shared/Table/types";
import { HiMiniPencil } from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import { BrandResponse } from "@/services/types/brand";
import Image from "next/image";

export const columns = defineColumns<BrandResponse>([
    {
        key: "image",
        header: "تصویر",
        filter: false,
        sortable: false,
        render: (row) => (
            <Image
                className={"w-10 h-10 mx-auto"}
                alt={"image"}
                width={100}
                height={100}
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/brand/${row.image}`}
            />
        ),
    },
    { key: "id", header: "شناسه" },
    { key: "name", header: "نام برند", editable: true },
    { key: "url", header: "آدرس برند", editable: true },
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

export const actions = defineActions<BrandResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"} />,
        href: (row) => `brand/edit/${row.id}`,
    },
]);
