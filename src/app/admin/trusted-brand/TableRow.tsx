import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Image from "next/image";
import {TrustedBrandResponse} from "@/services/types/trustedBrand";

export const columns = defineColumns<TrustedBrandResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {
        key: 'logo',
        header: 'تصویر',
        filter: false,
        sortable: false,
        render: (row) =><div className={"w-10 h-10"}><Image className={"w-10 h-10 mx-auto"}  width={50} height={50} alt={"image"}
                                  src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/trusted-brand/${row.logo}`}
        />
        </div>
    },
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
export const actions = defineActions<TrustedBrandResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href : (row) => `trusted-brand/edit/${row.id}`
    },
])
