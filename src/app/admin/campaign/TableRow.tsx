import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import { UrlObject } from "url";
import {CampaignResponse} from "@/services/types/campaign";


export const columns: Column<CampaignResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'title', header: 'نام  ', filterType: 'input', editable: true},
    {key: 'color', header: 'کد رنگ  ', filterType: 'input', editable: true},
    {key: 'background_color', header: 'کد رنگ پس زمینه ', filterType: 'input', editable: true},
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
    { key: 'start_date_fa', header: 'تاریخ شروع', filterType: 'date', editable: false },
    { key: 'end_date_fa', header: 'تاریخ پایان', filterType: 'date', editable: false },
    { key: 'created_at', header: 'تاریخ ایجاد', filterType: 'date', editable: false },

];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href : (value: any): UrlObject => {
            return {
                pathname: 'campaign/edit/'+value,
            };
        }
    },
]
