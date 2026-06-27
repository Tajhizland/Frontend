import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {OrderResponse} from "@/services/types/order";
import {OrderStatus} from "@/app/admin/order/orderStatus";
import {OrderDelivery} from "@/app/admin/order/orderDelivery";
import {OrderGateway} from "@/app/admin/order/orderGateway";


export const columns = defineColumns<OrderResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'user_id', header: 'شناسه کاربر', editable: false},
    {key: 'price', header: 'قیمت', editable: false},
    {key: 'delivery_price', header: 'هزینه ارسال', editable: false},
    {key: 'total_price', header: 'قیمت نهایی', editable: false},
    {key: 'use_wallet_price', header: 'مبلغ کیف پول', editable: false},
    {key: 'final_price', header: 'قیمت پرداختی', editable: false},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filter: 'select',
        options: OrderStatus.map((status, index) => ({
            label: status,
            value: index
        }))
        ,
        render: (row) => <Badge name={OrderStatus[Number(row.status)]}
                                  color={(Number(row.status) === 0 || Number(row.status) === 2 || Number(row.status) === 4) ? "red" : "green"}/>,

    },
    {
        key: 'delivery_method',
        header: 'روش ارسال',
        editable: true,
        filter: 'select',
        options: OrderDelivery.map((name, index) => ({
            label: name,
            value: (index + 1)
        }))
        ,
        render: (row) => <Badge name={OrderDelivery[Number(row.delivery_method) - 1]} color={"green"}/>,

    },    {
        key: 'payment_method',
        header: 'روش پرداخت',
        editable: true,
        filter: 'select',
        options: OrderGateway.map((name, index) => ({
            label: name,
            value: (index + 1)
        }))
        ,
        render: (row) => <Badge name={OrderGateway[Number(row.payment_method) - 1]} color={"green"}/>,

    },
    {key: 'created_at', header: 'تاریخ ثبت سفارش', editable: false},
    {key: 'delivery_date', header: 'تاریخ ارسال', editable: false},

]);
export const actions = defineActions<OrderResponse>([

    {
        label: <FaEye/>,
        href: (row) => `order/view/${row.id}`
    },
])
