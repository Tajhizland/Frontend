import {defineColumns} from "@/shared/Table/types";
import Badge from "@/shared/Badge/Badge";
import {SmsLogItemResponse} from "@/services/types/smsLogItem";

export const columns = defineColumns<SmsLogItemResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'mobile', header: 'موبایل', editable: true},
    {key: 'message', header: 'پیام', editable: false},
    {
        key: 'is_send',
        header: 'ارسال شده',
        editable: true,
        render: (row) => row.is_send == true ? <Badge name={"بله"} color={"green"}/> :
            <Badge name={"خیر"} color={"indigo"}/>,

    },
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},

]);
