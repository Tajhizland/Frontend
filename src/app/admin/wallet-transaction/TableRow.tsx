import {defineColumns} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {OrderResponse} from "@/services/types/order";
import {OrderStatus} from "@/app/admin/order/orderStatus";
import {WalletTransactionResponse} from "@/services/types/walletTransaction";


export const columns = defineColumns<WalletTransactionResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'user_id', header: 'شناسه کاربر', editable: false},
    {key: 'amount', header: 'قیمت', editable: false},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filter: 'select',
        options: [
            {
                label: "پرداخت شده",
                value: 1
            },
            {
                label: "پرداخت نشده",
                value: 0
            }],
        render: (row) => Number(row.status) === 1 ? <Badge name={"پرداخت شده"} color={"green"}/> :
            <Badge name={"پرداخت نشده"} color={"red"}/>,

    },
    {key: 'created_at', header: 'تاریخ ارسال', editable: false},

]);
