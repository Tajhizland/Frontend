import { Column, DataTableButtons } from "@/shared/DataTable/type";
import { HiMiniPencil } from "react-icons/hi2";
import { FaEye } from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import { UrlObject } from "node:url";
import { OrderResponse } from "@/services/types/order";
import { OrderStatus } from "@/app/admin/order/orderStatus";
import { OnHoldOrderResponse } from "@/services/types/onHoldOrder";


export const columns: Column<OnHoldOrderResponse>[] = [

    { key: 'id', header: 'شناسه', filterType: 'input', editable: false },
    { key: 'order_id', header: 'شناسه سفارش', filterType: 'input', editable: false },
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filterType: 'select',
        selectOptions: [
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
        render: (value) => {
            if (value == 0)
                return <Badge name={"درحال بررسی"} color={"purple"} />
            if (value == 1)
                return <Badge name={"تایید شده"} color={"green"} />
            if (value == 2)
                return <Badge name={"رد شده"} color={"red"} />
            return 0;

        },
    },

    { key: 'expire_date', header: 'تاریخ انقضا', filterType: 'input', editable: false },
    { key: 'review_date', header: 'تاریخ پرداخت', filterType: 'input', editable: false },


];
export const buttons: DataTableButtons[] = [

    {
        label: <FaEye />,
        colorClass: "bg-slate-900 text-white",
        type: "link",
        href: (value: any): UrlObject => {
            return {
                pathname: 'onHoldOrder/view/' + value,
            };
        }
    },
]