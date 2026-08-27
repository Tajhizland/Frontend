import {defineColumns} from "@/shared/Table/types";
import {RandomProductCategoryResponse} from "@/services/types/randomProductCategory";
import Image from "next/image";

export const columns = defineColumns<RandomProductCategoryResponse>([
    {
        key: 'category_id',
        header: 'تصویر',
        filter: false,
        sortable: false,
        render: (row) => <div className={"w-10 h-10"}>
            <Image className={"w-10 h-10 mx-auto rounded-sm object-cover"} width={50} height={50} alt={"image"}
                   src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/category/${row.category?.image}`}
            /></div>
    },
    {key: 'id', header: 'شناسه', editable: false},
    {
        key: 'category',
        header: 'نام دسته بندی',
        editable: true,
        render: (row) => row.category?.name,
    },
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
