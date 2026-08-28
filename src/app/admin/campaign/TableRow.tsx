import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {CampaignResponse} from "@/services/types/campaign";


export const columns = defineColumns<CampaignResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'title', header: 'نام  ', editable: true},
    {key: 'color', header: 'کد رنگ  ', editable: true},
    {key: 'background_color', header: 'کد رنگ پس زمینه ', editable: true},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filter: 'select',
        options: [
            {
                label: "فعال",
                value: 1
            },
            {
                label: "غیر فعال",
                value: 0
            }],
        render: (row) => Number(row.status) === 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },
    { key: 'start_date', filter: 'date', header: 'تاریخ شروع', editable: false },
    { key: 'end_date', filter: 'date', header: 'تاریخ پایان', editable: false },
    { key: 'created_at', filter: 'date', header: 'تاریخ ایجاد', editable: false },

]);
export const actions = defineActions<CampaignResponse>([
    {
        label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
        href: (row) => `campaign/edit/${row.id}`
    },
    {
        label: <span>اسلایدر</span>,
        color: "primary",
        href: (row) => `campaign/${row.id}/slider`
    },
    {
        label: <span>بنر</span>,
        color: "primary",
        href: (row) => `campaign/${row.id}/banner`
    },
])
