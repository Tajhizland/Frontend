import {defineColumns} from "@/shared/Table/types";
import {SearchLogResponse} from "@/services/types/marketing";

export const columns = defineColumns<SearchLogResponse>([
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'term', header: 'عبارت جستجو', editable: false},
    {key: 'product_count', header: 'تعداد محصول', editable: false},
    {key: 'result_count', header: 'کل نتایج', editable: false},
    {key: 'ip', header: 'آی‌پی', editable: false},
    {
        key: 'user',
        header: 'کاربر',
        editable: false,
        sortable: false,
        filter: false,
        render: (row) => row.user?.name || row.user?.username || "مهمان",
    },
    {key: 'created_at', filter: 'date', header: 'تاریخ', editable: false},
]);
