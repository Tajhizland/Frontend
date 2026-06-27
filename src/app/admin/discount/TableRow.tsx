import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {DiscountResponse} from "@/services/types/discount";

export const columns = defineColumns<DiscountResponse>([
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'title', header: 'نام', editable: true},
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
    {key: 'start_date', header: 'تاریخ شروع', editable: false},
    {key: 'end_date', header: 'تاریخ پایان', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
export const actions = defineActions<DiscountResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href: (row) => `discount/edit/${row.id}`,
    }, {
        label: <span className={"text-black text-sm"}>ویرایش آیتم ها</span>,
        color: "primary",
        href: (row) => `discount/item/${row.id}`,
    },

])
