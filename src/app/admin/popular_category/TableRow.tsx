import {Column} from "@/shared/DataTable/type";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {CategoryResponse} from "@/services/types/category";
import {PopularCategoryResponse} from "@/services/types/popularCategory";

export const columns: Column<PopularCategoryResponse>[] = [
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
