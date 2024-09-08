import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";

type DataRow = {
    id: number;
    user_id: string;
    price: number;
    discount: string;
    final_price: number;
    status: string;
    payment_method: number;
    order_date: string;
    created_at: string;
};

export const columns: Column<DataRow>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'user_id', header: 'شناسه کاربر', filterType: 'input', editable: false},
    {key: 'price', header: 'قیمت', filterType: 'input', editable: false},
    {key: 'discount', header: 'تخفیف', filterType: 'input', editable: false},
    {key: 'final_price', header: 'قیمت نهایی', filterType: 'input', editable: false},
    {key: 'status', header: 'وضعیت', filterType: 'input', editable: true},
    {key: 'payment_method', header: 'روش ارسال', filterType: 'input', editable: false},
    {key: 'order_date', header: 'تاریخ ثبت سفارش', filterType: 'input', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},

];
export const buttons: DataTableButtons[] = [

    {
        label: <FaEye/>,
        colorClass: "bg-slate-900 text-white",
        type: "link",
        href: (value: any): UrlObject => {
            return {
                pathname: 'order/view/' + value,
            };
        }
    },
]
