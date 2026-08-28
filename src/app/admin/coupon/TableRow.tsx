import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {CouponResponse} from "@/services/types/coupon";

export const columns = defineColumns<CouponResponse>([
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'code', header: 'نام', editable: true},
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
    {key: 'user_id', header: 'شناسه کاربر', editable: false},
    {key: 'min_order_value', header: 'برای حداقل مبلغ سفارش', editable: true},
    {key: 'max_order_value', header: 'برای حداکثر مبلغ سفارش', editable: true},
    { key: 'start_time', filter: 'date', header: 'تاریخ شروع', editable: false },
    { key: 'end_time', filter: 'date', header: 'تاریخ پایان', editable: false },
    { key: 'created_at', filter: 'date', header: 'تاریخ ایجاد', editable: false },
]);
export const actions = defineActions<CouponResponse>([
    {
        label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
        href: (row) => `coupon/edit/${row.id}`,
    },
])
