import {Column} from "@/shared/DataTable/type";
import Badge from "@/shared/Badge/Badge";
import {SmsLogItemResponse} from "@/services/types/smsLogItem";

export const columns: Column<SmsLogItemResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'mobile', header: 'موبایل', filterType: 'input', editable: true},
    {key: 'message', header: 'پیام', filterType: 'input', editable: false},
    {
        key: 'is_send',
        header: 'ارسال شده',
        editable: true,
        filterType: 'input', 
        render: (value) => value == true ? <Badge name={"بله"} color={"green"}/> :
            <Badge name={"خیر"} color={"indigo"}/>,

    },
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},

];
