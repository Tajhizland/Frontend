import {defineColumns} from "@/shared/Table/types";
import Badge from "@/shared/Badge/Badge";
import {ProductResponse} from "@/services/types/product";
import Image from "next/image";

export const columns = defineColumns<ProductResponse>([

    {
        key: 'images', header: 'تصویر', filter: false, sortable: false, editable: false,
        render: (row) => <div className={"w-16 h-16"}>
            {
                //@ts-ignore
                row.images?.data?.length > 0 ?
                    <Image className={"w-16 h-16 mx-auto"}
                           width={50}
                           height={50}
                           alt={"image"}
                        //@ts-ignore
                           src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${row.images?.data?.[0]?.url}`}
                    />
                    :
                    <span>
                        -
                    </span>
            }

        </div>
    },
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'name', header: 'نام محصول', editable: true},
    {key: 'view', header: 'تعداد بازدید', editable: false},
    {key: 'url', header: 'آدرس محصول', editable: true},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filter: 'select',
        options: [
            {
                label: "فعال",
                value: 1
            },
            {
                label: "غیر فعال",
                value: 0
            }],
        render: (row) => Number(row.status) === 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },
    {
        key: 'is_stock',
        header: 'دست دوم',
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
        render: (row) => Number(row.is_stock) === 1 ? <Badge name={"بله"} color={"red"}/> :
            <Badge name={"خیر"} color={"green"}/>,

    },
    {key: 'category', header: 'دسته محصول', editable: true},
    {key: 'brand_name', header: 'برند محصول', editable: true},
    {key: 'images_count', header: 'تعداد عکس', editable: false},
    {key: 'testing_time', header: 'مهلت تست', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},


    // {
    //     key: 'value',
    //     header: 'مقدار',
    //     filterType: 'input',
    //     render: (value) => value * 2*-10, // Custom render function
    //  editable:true
    // },
    // { key: 'id', header: 'شناسه', filterType: 'input' },
    // { key: 'name', header: 'عنوان', filterType: 'input' },
    // {
    //     key: 'category',
    //     header: 'دسته بندی',
    //     filterType: 'select',
    //     selectOptions: ['A', 'B', 'C'], // Custom options for this column
    // },
    // {
    //     key: 'date',
    //     header: 'تاریخ ایجاد',
    //     filterType: 'date', // Date filter
    // },
    // {
    //     key: 'value',
    //     header: 'مقدار',
    //     filterType: 'input',
    //     render: (value) => value * 2, // Custom render function
    // },
    // { key: 'id', header: 'شناسه', filterType: 'input' },
    // { key: 'name', header: 'عنوان', filterType: 'input' },
    // {
    //     key: 'category',
    //     header: 'دسته بندی',
    //     filterType: 'select',
    //     selectOptions: ['A', 'B', 'C'], // Custom options for this column
    // },
    // {
    //     key: 'date',
    //     header: 'تاریخ ایجاد',
    //     filterType: 'date', // Date filter
    // },
    // {
    //     key: 'value',
    //     header: 'مقدار',
    //     filterType: 'input',
    //     render: (value) => value * 2, // Custom render function
    // },
    // {
    //     key: 'category',
    //     header: 'دسته بندی',
    //     filterType: 'select',
    //     selectOptions: ['A', 'B', 'C'], // Custom options for this column
    // },
    // {
    //     key: 'date',
    //     header: 'تاریخ ایجاد',
    //     filterType: 'date', // Date filter
    // },
    // {
    //     key: 'value',
    //     header: 'مقدار',
    //     filterType: 'input',
    //     render: (value) => value * 2, // Custom render function
    // },
    // {
    //     key: 'category',
    //     header: 'دسته بندی',
    //     filterType: 'select',
    //     selectOptions: ['A', 'B', 'C'], // Custom options for this column
    // },
    // {
    //     key: 'date',
    //     header: 'تاریخ ایجاد',
    //     filterType: 'date', // Date filter
    // },
    // {
    //     key: 'value',
    //     header: 'مقدار',
    //     filterType: 'input',
    //     render: (value) => value * 2, // Custom render function
    // },
]);
