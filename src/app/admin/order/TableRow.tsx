import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {OrderResponse} from "@/services/types/order";
import {OrderStatus} from "@/app/admin/order/orderStatus";


export const columns: Column<OrderResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'user_id', header: 'شناسه کاربر', filterType: 'input', editable: false},
    {key: 'price', header: 'قیمت', filterType: 'input', editable: false},
    {key: 'delivery_price', header: 'هزینه ارسال', filterType: 'input', editable: false},
    {key: 'final_price', header: 'قیمت نهایی', filterType: 'input', editable: false},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filterType: 'select',
        selectOptions: OrderStatus.map((status, index) => ({
            label: status,
            value: index
        }))
    ,
        render: (value) =>  <Badge name={OrderStatus[Number(value)]} color={(value==0||value==2||value==4)?"red":"green"}/>  ,

    },
    {key: 'order_date', header: 'تاریخ ثبت سفارش', filterType: 'input', editable: false},
    {key: 'delivery_date', header: 'تاریخ ارسال', filterType: 'input', editable: false},

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
