import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {NewsResponse} from "@/services/types/news";

export const columns = defineColumns<NewsResponse>([
    { key: 'id', header: 'شناسه', editable: false },
    { key: 'title', header: 'عنوان', editable: true },
    { key: 'url', header: 'آدرس محصول', editable: true },
    {
        key: 'published',
        header: 'وضعیت',
        editable: true,
        filter: 'select',
        options: [
            {
                label: "فعال",
                value: 1
            },
            {
                label: "غیر فعال",
                value: 0
            }],
        render: (row) => Number(row.published) === 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },
    { key: 'created_at', filter: 'date', header: 'تاریخ ایجاد', editable: false },
]);
export const actions = defineActions<NewsResponse>([
    {
        label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
        href: (row) => `news/edit/${row.id}`
    },
])
