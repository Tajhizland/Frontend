import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import Image from "next/image";
import {TrustedBrandResponse} from "@/services/types/trustedBrand";

export const columns: Column<TrustedBrandResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {
        key: 'logo',
        header: 'تصویر',
        hasFilter: false,
        hasSort: false,
        render: (value) =><div className={"w-10 h-10"}><Image className={"w-10 h-10 mx-auto"}  width={50} height={50} alt={"image"}
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/trusted-brand/${value}`}
        />
        </div>
    },
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href : (value: any): UrlObject => {
            return {
                pathname: 'trusted-brand/edit/'+value,
            };
        }
    },
]
