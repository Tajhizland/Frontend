import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {OrderResponse} from "@/services/types/order";
import {OrderStatus} from "@/app/admin/order/orderStatus";
import {OnHoldOrderResponse} from "@/services/types/onHoldOrder";


export const columns: Column<OnHoldOrderResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'order_id', header: 'شناسه کاربر', filterType: 'input', editable: false},
    {key: 'status', header: 'شناسه کاربر', filterType: 'input', editable: false},
    {key: 'expire_date', header: 'شناسه کاربر', filterType: 'input', editable: false},
    {key: 'review_date', header: 'شناسه کاربر', filterType: 'input', editable: false},


];
export const buttons: DataTableButtons[] = [

    {
        label: <FaEye/>,
        colorClass: "bg-slate-900 text-white",
        type: "link",
        href: (value: any): UrlObject => {
            return {
                pathname: 'onHoldOrder/view/' + value,
            };
        }
    },
]
