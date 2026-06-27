import {defineColumns} from "@/shared/Table/types";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import { ProductResponse } from "@/services/types/product";
import Badge from "@/shared/Badge/Badge";

export const columns = defineColumns<SpecialProductResponse>([
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'product_id', header: 'شناسه محصول', editable: false},
    {
        key: 'product',
        header: 'نام محصول',
        editable: false,
        filter: false,
        //@ts-ignore
        render: (row) => row.product?.name,
    },
    {
        key: 'homepage',
        header: 'نمایش در صفحه اصلی',
        editable: true,
        filter: 'select',
        options: [
            {
                label: "بله",
                value: 1
            },
            {
                label: "خیر",
                value: 0
            }],
        render: (row) => Number(row.homepage) === 1 ? <Badge name={"بله"} color={"green"}/> :
            <Badge name={"خیر"} color={"red"}/>,

    },
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
