import {Column} from "@/shared/DataTable/type";
import {CategoryResponse} from "@/services/types/category";
import {SpecialProductResponse} from "@/services/types/specialProduct";

export const columns: Column<SpecialProductResponse>[] = [
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
