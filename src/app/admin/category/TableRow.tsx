import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";

type DataRow = {
    id: number;
    name: string;
    view: number;
    url: string;
    status: number;
    icon: string;
    created_at: string;
};

export const columns: Column<DataRow>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: true},
    {key: 'name', header: 'نام دسته‌بندی', filterType: 'input', editable: true},
    {key: 'url', header: 'آدرس دسته‌بندی', filterType: 'input', editable: true},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filterType: 'select',
        selectOptions: [
            {
                label: "فعال",
                value: 1
            },
            {
                label: "غیر فعال",
                value: 0
            }],
        render: (value) => value == 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "action",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        action: (value: any) => console.log(value)
    },

    {
        label: <FaEye/>,
        type: "action",
        colorClass: "bg-slate-900 text-white",
        action: (value: any) => console.log(value)
    },
]
