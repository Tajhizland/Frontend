import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {ConceptResponse} from "@/services/types/concept";
import Image from "next/image";


export const columns = defineColumns<ConceptResponse>([
    {
        key: 'icon',
        header: 'آیکن',
        filter: false,
        sortable: false,
        render: (row) =><div className={"w-10 h-10"}><Image className={"w-10 h-10 mx-auto"} width={50} height={50} alt={"image"}
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/concept/${row.icon}`}
        /></div>
    },
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'title', header: 'عنوان', editable: true},
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
export const actions = defineActions<ConceptResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href: (row) => `concept/edit/${row.id}`,
    },
])
