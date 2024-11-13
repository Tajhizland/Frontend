import {Column} from "@/shared/DataTable/type";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import { ProductResponse } from "@/services/types/product";
import Badge from "@/shared/Badge/Badge";

export const columns: Column<SpecialProductResponse>[] = [
    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'product_id', header: 'شناسه محصول', filterType: 'input', editable: false},
    {
        key: 'product',
        header: 'نام محصول',
        editable: false,
        filterType: 'input',
        hasFilter:false,
        //@ts-ignore
        render: (value:ProductResponse) => value?.name,
    },
    {
        key: 'homepage',
        header: 'نمایش در صفحه اصلی',
        editable: true,
        filterType: 'select',
        selectOptions: [
            {
                label: "بله",
                value: 1
            },
            {
                label: "خیر",
                value: 0
            }],
        render: (value) => value == 1 ? <Badge name={"بله"} color={"green"}/> :
            <Badge name={"خیر"} color={"red"}/>,

    },
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
