import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {FaEye} from "react-icons/fa";
import Badge from "@/shared/Badge/Badge";
import {UrlObject} from "node:url";
import {ProductResponse} from "@/services/types/product";


export const columns: Column<ProductResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'name', header: 'نام محصول', filterType: 'input', editable: true},
    {key: 'view', header: 'تعداد بازدید', filterType: 'input', editable: false},
    {key: 'url', header: 'آدرس محصول', filterType: 'input', editable: true},

    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
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
        href : (value: any): UrlObject => {
            return {
                pathname: 'product/edit/'+value,
            };
        }
    },
]
