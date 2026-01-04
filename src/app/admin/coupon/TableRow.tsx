import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {DiscountResponse} from "@/services/types/discount";
import {CouponResponse} from "@/services/types/coupon";

export const columns: Column<CouponResponse>[] = [
    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'code', header: 'نام', filterType: 'input', editable: true},
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
    {key: 'user_id', header: 'شناسه کاربر', filterType: 'input', editable: false},
    {key: 'min_order_value', header: 'برای حداقل مبلغ سفارش', filterType: 'input', editable: true},
    {key: 'max_order_value', header: 'برای حداکثر مبلغ سفارش', filterType: 'input', editable: true},
    {key: 'start_time_fa', header: 'تاریخ شروع', filterType: 'input', editable: false},
    {key: 'end_time_fa', header: 'تاریخ پایان', filterType: 'input', editable: false},
    {key: 'created_at_fa', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href: (value: any): UrlObject => {
            return {
                pathname: 'coupon/edit/' + value,
            };
        }
    },
]
