import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {TransactionResponse} from "@/services/types/transaction";
import {NotificationResponse} from "@/services/types/notification";

export const columns = defineColumns<NotificationResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'title', header: 'عنوان', editable: false},
    {key: 'message', header: 'پیام', editable: false},
    {key: 'link', header: 'لینک', editable: false},
    {key: 'seen', header: 'مشاهده شده', editable: false},
    {key: 'type', header: 'نوع', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},


]);
export const actions = defineActions<NotificationResponse>([

])
