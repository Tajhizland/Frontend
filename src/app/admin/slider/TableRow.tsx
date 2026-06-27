import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {TransactionResponse} from "@/services/types/transaction";
import {SliderResponse} from "@/services/types/slider";

export const columns = defineColumns<SliderResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'title', header: 'عنوان', editable: false},
    {key: 'url', header: 'آدرس ', editable: false},
    {key: 'type', header: 'نمایش برای ', editable: false},
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
export const actions = defineActions<SliderResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href: (row) => `slider/edit/${row.id}`,
    },
])
