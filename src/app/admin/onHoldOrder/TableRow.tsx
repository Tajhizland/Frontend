import { defineColumns, defineActions } from "@/shared/Table/types";
import { HiMiniPencil } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import { OrderResponse } from "@/services/types/order";
import { OrderStatus } from "@/app/admin/order/orderStatus";
import { OnHoldOrderResponse } from "@/services/types/onHoldOrder";


export const columns = defineColumns<OnHoldOrderResponse>([

    { key: 'id', header: 'شناسه', editable: false },
    { key: 'order_id', header: 'شناسه سفارش', editable: false },
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filter: 'select',
        options: [
            {
                label: "درحال بررسی",
                value: 0
            },
            {
                label: "تایید شده",
                value: 1
            },
            {
                label: "رد شده",
                value: 2
            }],
        render: (row) => {
            if (Number(row.status) === 0)
                return <Badge name={"درحال بررسی"} color={"purple"} />
            if (Number(row.status) === 1)
                return <Badge name={"تایید شده"} color={"green"} />
            if (Number(row.status) === 2)
                return <Badge name={"رد شده"} color={"red"} />
            return 0;

        },
    },

    { key: 'expire_date', header: 'تاریخ انقضا', editable: false },
    { key: 'review_date', header: 'تاریخ پرداخت', editable: false },


]);
export const actions = defineActions<OnHoldOrderResponse>([

    {
        label: <FaEye />,
        href: (row) => `onHoldOrder/view/${row.id}`
    },
])
