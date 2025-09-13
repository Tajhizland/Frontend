import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {DictionaryResponse} from "@/services/types/dictionary";

export const columns: Column<DictionaryResponse>[] = [
    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'original_word', header: 'کلمه اصلی', filterType: 'input', editable: true},
    {key: 'mean', header: 'معنی', filterType: 'input', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href: (value: any): UrlObject => {
            return {
                pathname: 'dictionary/edit/' + value,
            };
        }
    },

]
