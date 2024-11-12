import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {TransactionResponse} from "@/services/types/transaction";
import {SliderResponse} from "@/services/types/slider";
import {UrlObject} from "node:url";
import Image from "next/image";

export const columns: Column<SliderResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {
        key: 'image',
        header: 'تصویر',
        hasFilter: false,
        hasSort: false,
        render: (value) => <Image className={"w-10 h-10 mx-auto"} fill alt={"image"}
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banner/${value}`}
        />
    },
    {key: 'url', header: 'آدرس ', filterType: 'input', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href : (value: any): UrlObject => {
            return {
                pathname: 'banner/edit/'+value,
            };
        }
    },
]
