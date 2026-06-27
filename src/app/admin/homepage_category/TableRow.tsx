import {defineColumns} from "@/shared/Table/types";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import Image from "next/image";

export const columns = defineColumns<HomepageCategoryResponse>([
    {
        key: 'icon',
        header: 'آیکن',
        filter: false,
        sortable: false,
        render: (row) =><div className={"w-10 h-10"}><Image className={"w-10 h-10 mx-auto"} width={50} height={50} alt={"image"}
                                                              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/homepageCategory/${row.icon}`}
        /></div>
    },
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'category_id', header: 'شناسه دسته بندی', editable: true},
    {
        key: 'category',
        header: 'نام دسته بندی',
        editable: true,
        render: (row) => row.category?.name,

    },
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
