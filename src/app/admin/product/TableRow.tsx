import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {ProductResponse} from "@/services/types/product";
import {BsCoin} from "react-icons/bs";
import Image from "next/image";

export const columns: Column<ProductResponse>[] = [

    {
        key: 'images', header: 'تصویر', hasFilter: false, hasSort: false, editable: false,
        render: (value) => <div className={"w-16 h-16"}>
            {
                //@ts-ignore
                value?.data?.length > 0 ?
                    <Image className={"w-16 h-16 mx-auto"}
                           width={50}
                           height={50}
                           alt={"image"}
                        //@ts-ignore
                           src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${value?.data?.[0]?.url}`}
                    />
                    :
                    <span>
                        -
                    </span>
            }

        </div>
    },
    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'name', header: 'نام محصول', filterType: 'input', editable: true},
    {key: 'view', header: 'تعداد بازدید', filterType: 'input', editable: false},
    {key: 'url', header: 'آدرس محصول', filterType: 'input', editable: true},
    {
        key: 'status',
        header: 'وضعیت',
        editable: true,
        filterType: 'select',
        selectOptions: [
            {
                label: "فعال",
                value: 1
            },
            {
                label: "غیر فعال",
                value: 0
            }],
        render: (value) => value == 1 ? <Badge name={"فعال"} color={"green"}/> :
            <Badge name={"غیر‌‌فعال"} color={"red"}/>,

    },
    {
        key: 'is_stock',
        header: 'دست دوم',
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
        render: (value) => value == 1 ? <Badge name={"بله"} color={"red"}/> :
            <Badge name={"خیر"} color={"green"}/>,

    },
    {key: 'category', header: 'دسته محصول', filterType: 'input', editable: true},
    {key: 'brand_name', header: 'برند محصول', filterType: 'input', editable: true},
    {key: 'images_count', header: 'تعداد عکس', filterType: 'input', editable: false},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},


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
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href: (value: any): UrlObject => {
            return {
                pathname: 'product/edit/' + value,
            };
        }
    }, {
        label: <BsCoin className={"text-black w-5 h-5"} title={"ویرایش قیمت"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href: (value: any): UrlObject => {
            return {
                pathname: 'product/color/' + value,
            };
        }
    }, {
        label: <BsCoin className={"text-black w-5 h-5"} title={"ویرایش قیمت"}/>,
        type: "action",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        action: (id: number) => {
            console.log(id);
        }
    },
]
