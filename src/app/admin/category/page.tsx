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
    name: string;
    view: number;
    url: string;
    status: number;
    icon: string;
    created_at: string;
};

export default function page() {
    const columns: Column<DataRow>[] = [
        // {
        //     key: 'icon',
        //     header: 'تصویر',
        //     hasFilter: false,
        //     hasSort: false,
        //     render: (value) => <img className={"w-10 h-10 mx-auto"} alt={"s"}
        //                             src={"https://statics.honari.com/honarifiles/faq/" + value}/>
        // },
        {key: 'id', header: 'شناسه', filterType: 'input', editable: true},
        {key: 'name', header: 'نام دسته‌بندی', filterType: 'input', editable: true},
        {key: 'url', header: 'آدرس دسته‌بندی', filterType: 'input', editable: true},
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
        // {key: 'view', header: 'تعداد بازدید', filterType: 'input', editable: false},
        // {key: 'url', header: 'آدرس محصول', filterType: 'input', editable: true},

        // {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
        // {
        //     key: 'status',
        //     header: 'وضعیت',
        //     editable: true,
        //     filterType: 'select',
        //     selectOptions: [
        //         {
        //             label: "فعال",
        //             value: 1
        //         },
        //         {
        //             label: "غیر فعال",
        //             value: 0
        //         }],
        //     render: (value) => value == 1 ? <Badge name={"فعال"} color={"green"}/> :
        //         <Badge name={"غیر‌‌فعال"} color={"red"}/>,

        // }, 
    ];
    const buttons: DataTableButtons[] = [
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
            type: "action",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            action: (value: any) => console.log(value)
        },

        {
            label: <FaEye/>,
            type: "action",
            colorClass: "bg-slate-900 text-white",
            action: (value: any) => console.log(value)
        },
    ]


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته‌بندی",
                href: "category"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته‌بندی
            </PageTitle>
            <PageLink>
                <Link href={"/admin/category/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"admin/category/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
