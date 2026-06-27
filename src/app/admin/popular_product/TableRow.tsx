import {defineColumns} from "@/shared/Table/types";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {CategoryResponse} from "@/services/types/category";
import {PopularCategoryResponse} from "@/services/types/popularCategory";
import {PopularProductResponse} from "@/services/types/popularProduct";
import { ProductResponse } from "@/services/types/product";

export const columns = defineColumns<PopularProductResponse>([
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'product_id', header: 'شناسه محصول', editable: false},
    {
        key: 'product',
        header: 'نام محصول',
        editable: false,
        //@ts-ignore
        render: (row) => row.product?.name,
    },
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
