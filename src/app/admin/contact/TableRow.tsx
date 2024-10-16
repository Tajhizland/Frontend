import {Column, DataTableButtons} from "@/shared/DataTable/type";  
import {FaEye} from "react-icons/fa"; 
import {UrlObject} from "url";
import { ContactResponse } from "@/services/types/contact";
 
export const columns: Column<ContactResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'name', header: 'نام', filterType: 'input', editable: false},
    {key: 'email', header: 'ایمیل', filterType: 'input', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},

];
export const buttons: DataTableButtons[] = [
    {
        label: <FaEye/>,
        type: "link",
        colorClass: "bg-white   border border-slate-900 outline-none ",
        href : (value: any): UrlObject => {
            return {
                pathname: 'contact/show/'+value,
            };
        }
    },
]
