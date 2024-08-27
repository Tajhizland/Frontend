"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {FaEdit, FaEye} from "react-icons/fa";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";

type DataRow = {
    id: number;
    title: string;
    status: number;
    icon: string;
};

export default function page() {
    const columns: Column<DataRow>[] = [
        {
            key: 'icon',
            header: 'تصویر',
            hasFilter:false,
            hasSort:false,
            render:(value)=> <img  className={"w-10 h-10 mx-auto"} alt={"s"}  src={"https://statics.honari.com/honarifiles/faq/"+value} />
        },
        {key: 'id', header: 'شناسه', filterType: 'input',   editable: true},

        {key: 'title', header: 'عنوان', filterType: 'input' ,editable: true},
        {
            key: 'status',
            header: 'وضعیت',
            editable: true ,
            filterType: 'select',
            selectOptions: ['فعال', 'غیرفعال' ],
            render: (value) => value == 1 ? <Badge name={"فعال"}  color={"green"}/> :<Badge name={"غیر‌‌فعال"}  color={"red"}/>,

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
    const buttons:DataTableButtons[] =[
        {
            label:<HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"} />,
            type:"action",
            colorClass:"bg-white text-white border border-slate-900 outline-none ",
            action:(value:any) => console.log(value)
        } ,

        {
            label:<FaEye />,
            type:"action",
            colorClass:"bg-slate-900 text-white",
            action:(value:any) => console.log(value)
        } ,
    ]


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت محصولات
            </PageTitle>
            <PageLink>
                <Link href={"/admin/product/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"https://honari.com/sa/api/cat_list"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
