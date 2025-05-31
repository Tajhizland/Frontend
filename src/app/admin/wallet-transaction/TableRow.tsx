import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {OrderResponse} from "@/services/types/order";
import {OrderStatus} from "@/app/admin/order/orderStatus";
import {WalletTransactionResponse} from "@/services/types/walletTransaction";


export const columns: Column<WalletTransactionResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'user_id', header: 'شناسه کاربر', filterType: 'input', editable: false},
    {key: 'amount', header: 'قیمت', filterType: 'input', editable: false},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filterType: 'select',
        selectOptions: [
            {
                label: "پرداخت شده",
                value: 1
            },
            {
                label: "پرداخت نشده",
                value: 0
            }],
        render: (value) => value == 1 ? <Badge name={"پرداخت شده"} color={"green"}/> :
            <Badge name={"پرداخت نشده"} color={"red"}/>,

    },
    {key: 'created_at', header: 'تاریخ ارسال', filterType: 'input', editable: false},

];

