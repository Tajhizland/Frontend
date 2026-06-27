import {defineColumns} from "@/shared/Table/types";
import {SmsLogResponse} from "@/services/types/smsLog";

export const columns = defineColumns<SmsLogResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'type', header: 'نوع', editable: true},
    {key: 'status', header: 'وضعیت', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
