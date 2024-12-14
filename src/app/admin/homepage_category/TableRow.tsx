import {Column} from "@/shared/DataTable/type";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {CategoryResponse} from "@/services/types/category";
import Image from "next/image";

export const columns: Column<HomepageCategoryResponse>[] = [
    {
        key: 'icon',
        header: 'آیکن',
        hasFilter: false,
        hasSort: false,
        render: (value) =><div className={"w-10 h-10"}><Image className={"w-10 h-10 mx-auto"} width={50} height={50} alt={"image"}
                                                              src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/homepageCategory/${value}`}
        /></div>
    },
    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'category_id', header: 'شناسه دسته بندی', filterType: 'input', editable: true},
    {
        key: 'category',
        header: 'نام دسته بندی',
        editable: true,
        filterType: 'input',
        //@ts-ignore
        render: (value:CategoryResponse) => value?.name,

    },
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
