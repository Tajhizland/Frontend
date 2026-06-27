import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {VlogCategoryResponse} from "@/services/types/vlogCategory";

export const columns = defineColumns<VlogCategoryResponse>([
    { key: 'id', header: 'شناسه', editable: false },
    { key: 'name', header: 'عنوان', editable: true },
    { key: 'url', header: 'آدرس', editable: true },
    {
        key: 'status',
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
        render: (row) => Number(row.status) === 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },
    { key: 'created_at', header: 'تاریخ ایجاد', editable: false },
]);
export const actions = defineActions<VlogCategoryResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href : (row) => `vlog_category/edit/${row.id}`
    }
])
