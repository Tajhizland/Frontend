import {Column} from "@/shared/DataTable/type";
import {SmsLogResponse} from "@/services/types/smsLog";

export const columns: Column<SmsLogResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'type', header: 'نوع', filterType: 'input', editable: true},
    {key: 'status', header: 'وضعیت', filterType: 'input', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
