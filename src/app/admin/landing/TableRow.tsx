import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {LandingResponse} from "@/services/types/landing";


export const columns = defineColumns<LandingResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'title', header: 'عنوان', editable: true},
    {key: 'url', header: 'آدرس', editable: true},
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
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},

]);
export const actions = defineActions<LandingResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href: (row) => `landing/edit/${row.id}`
    },
])
