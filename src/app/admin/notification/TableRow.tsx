import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {TransactionResponse} from "@/services/types/transaction";
import {NotificationResponse} from "@/services/types/notification";

export const columns: Column<NotificationResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'title', header: 'عنوان', filterType: 'input', editable: false},
    {key: 'message', header: 'پیام', filterType: 'input', editable: false},
    {key: 'link', header: 'لینک', filterType: 'input', editable: false},
    {key: 'seen', header: 'مشاهده شده', filterType: 'input', editable: false},
    {key: 'type', header: 'نوع', filterType: 'input', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},


];
export const buttons: DataTableButtons[] = [

]
