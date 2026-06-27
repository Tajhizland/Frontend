import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {TransactionResponse} from "@/services/types/transaction";

export const columns = defineColumns<TransactionResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'user_id', header: 'شناسه کاربر', editable: false},
    {key: 'order_id', header: 'شماره سفارش ', editable: false},
    {key: 'track_id', header: 'شماره پیگیری', editable: false},
    {key: 'price', header: 'مبلغ', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},


]);
export const actions = defineActions<TransactionResponse>([

])
