import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";

type DataRow = {
    id: number;
    user_id: string;
    order_id: string;
    track_id: string;
    price: string;
    created_at: string;

};
export const columns: Column<DataRow>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'user_id', header: 'شناسه کاربر', filterType: 'input', editable: false},
    {key: 'order_id', header: 'شماره سفارش ', filterType: 'input', editable: false},
    {key: 'track_id', header: 'شماره پیگیری', filterType: 'input', editable: false},
    {key: 'price', header: 'مبلغ', filterType: 'input', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},


];
export const buttons: DataTableButtons[] = [

]
