import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Image from "next/image";
import {CampaignBannerResponse} from "@/services/types/campaignBanner";

export const columns = defineColumns<CampaignBannerResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {
        key: 'image',
        header: 'تصویر',
        filter: false,
        sortable: false,
        render: (row) => <div className={"w-10 h-10"}><Image className={"w-10 h-10 mx-auto"} width={50} height={50}
                                                               alt={"image"}
                                                               src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/banner/${row.image}`}
        />
        </div>
    },
    {key: 'url', header: 'آدرس ', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
export const actions = defineActions<CampaignBannerResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href: (row) => `banner/edit/${row.id}`
    },
])
