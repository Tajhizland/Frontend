import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";

type DataRow = {
    id: number;
    name: string;
    username: string;
    role: string;

};
export const columns: Column<DataRow>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: true},
    {key: 'name', header: 'نام کاربر', filterType: 'input', editable: true},
    {key: 'username', header: 'نام کاربری', filterType: 'input', editable: true},
    {
        key: 'role',
        header: 'نقش',
        editable: true,
        filterType: 'select',
        selectOptions: [
            {
                label: "کاربر",
                value: "user"
            },
            {
                label: "مدیر",
                value: "admin"
            }],
        render: (value) => value == "admin" ? <Badge name={"مدیر"} color={"green"}/> :
            <Badge name={"کاربر"} color={"indigo"}/>,

    },

];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "action",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        action: (value: any) => console.log(value)
    },
]
