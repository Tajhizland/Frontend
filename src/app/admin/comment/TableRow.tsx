import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "url";

type DataRow = {
    id: number;
    user: string;
    product_id: string;
    rating: string;
    text: string;
    status: string;
    created_at: string;

};
export const columns: Column<DataRow>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'user', header: 'کاربر', filterType: 'input', editable: false},
    {key: 'product_id', header: 'شناسه محصول', filterType: 'input', editable: false},
    {key: 'rating', header: 'امتیاز', filterType: 'input', editable: false},
     {key: 'status', header: 'وضعیت', filterType: 'input', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},

];
export const buttons: DataTableButtons[] = [

    {
        label: <FaEye/>,
        type: "link",
        colorClass: "bg-white   border border-slate-900 outline-none ",
        href : (value: any): UrlObject => {
            return {
                pathname: 'comment/show/'+value,
            };
        }
    },
]
