import {defineActions, defineColumns} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {InstagramPostResponse} from "@/services/types/instagramPost";

export const columns = defineColumns<InstagramPostResponse>([
    {key: 'id', header: 'شناسه', editable: false},
    {
        key: 'caption',
        header: 'کپشن',
        editable: false,
        render: (row) => (
            <span className="block max-w-xs truncate">{row.caption || "—"}</span>
        ),
    },
    {
        key: 'mediaCount',
        header: 'تعداد فایل',
        editable: false,
        filter: false,
        sortable: false,
        render: (row) => row.mediaCount ?? 0,
    },
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filter: 'select',
        options: [
            {label: "فعال", value: 1},
            {label: "غیر فعال", value: 0},
        ],
        render: (row) => Number(row.status) === 1
            ? <Badge name={"فعال"} color={"green"}/>
            : <Badge name={"غیر‌‌فعال"} color={"red"}/>,
    },
    {key: 'created_at', filter: 'date', header: 'تاریخ ایجاد', editable: false},
]);

export const actions = defineActions<InstagramPostResponse>([
    {
        label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
        href: (row) => `instagram_post/edit/${row.id}`
    },
]);
