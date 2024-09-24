import {Column} from "@/shared/DataTable/type";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {CategoryResponse} from "@/services/types/category";
import {PopularCategoryResponse} from "@/services/types/popularCategory";
import {PopularProductResponse} from "@/services/types/popularProduct";

export const columns: Column<PopularProductResponse>[] = [
    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'product_id', header: 'شناسه محصول', filterType: 'input', editable: false},
    {
        key: 'product',
        header: 'نام محصول',
        editable: false,
        filterType: 'input',
        //@ts-ignore
        render: (value:CategoryResponse) => value?.name,
    },
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
