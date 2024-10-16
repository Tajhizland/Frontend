import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {NewsResponse} from "@/services/types/news";
import {PageResponse} from "@/services/types/page";
import {UrlObject} from "node:url";

export const columns: Column<PageResponse>[] = [
    { key: 'id', header: 'شناسه', filterType: 'input', editable: false },
    { key: 'title', header: 'عنوان', filterType: 'input', editable: true },
    { key: 'url', header: 'آدرس محصول', filterType: 'input', editable: true },
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
    { key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false },
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href : (value: any): UrlObject => {
            return {
                pathname: 'page/edit/'+value,
            };
        }
    }
]
