import {defineColumns} from "@/shared/Table/types";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {CategoryResponse} from "@/services/types/category";
import {PopularCategoryResponse} from "@/services/types/popularCategory";

export const columns = defineColumns<PopularCategoryResponse>([
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'category_id', header: 'شناسه دسته بندی', editable: true},
    {
        key: 'category',
        header: 'نام دسته بندی',
        editable: true,
        //@ts-ignore
        render: (row) => row.category?.name,
    },
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
