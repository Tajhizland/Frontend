import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {DiscountResponse} from "@/services/types/discount";

export const columns: Column<DiscountResponse>[] = [
    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'title', header: 'نام', filterType: 'input', editable: true},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filterType: 'select',
        selectOptions: [
            {
                label: "فعال",
                value: 1
            },
            {
                label: "غیر فعال",
                value: 0
            }],
        render: (value) => value == 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },
    {key: 'start_date', header: 'تاریخ شروع', filterType: 'input', editable: false},
    {key: 'end_date', header: 'تاریخ پایان', filterType: 'input', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href: (value: any): UrlObject => {
            return {
                pathname: 'discount/edit/' + value,
            };
        }
    }, {
        label: <span className={"text-black text-sm"}>ویرایش آیتم ها</span>,
        type: "link",
        colorClass: " border border-slate-900 outline-none ",
        href: (value: any): UrlObject => {
            return {
                pathname: 'discount/item/' + value,
            };
        }
    },

]
