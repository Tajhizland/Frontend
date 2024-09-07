"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import { Column, DataTableButtons } from "@/shared/DataTable/type";
import { FaEdit, FaEye } from "react-icons/fa";
import { HiMiniPencil } from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";

type DataRow = {
    id: number;
    title: string;
    url: string;
    created_at: string;
};

export default function Page() {
    const columns: Column<DataRow>[] = [
        { key: 'id', header: 'شناسه', filterType: 'input', editable: true },
        { key: 'title', header: 'عنوان', filterType: 'input', editable: true },
        { key: 'url', header: 'آدرس محصول', filterType: 'input', editable: true },
        { key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false },
    ];
    const buttons: DataTableButtons[] = [
        {
            label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"} />,
            type: "action",
            colorClass: "bg-white text-white border border-slate-900 outline-none ",
            action: (value: any) => console.log(value)
        },
        {
            label: <FaEye />,
            type: "action",
            colorClass: "bg-slate-900 text-white",
            action: (value: any) => console.log(value)
        },
    ]
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "بلاگ",
                href: "product"
            }
        ]} />
        <Panel>
            <PageTitle>
                مدیریت بلاگ
            </PageTitle>
            <PageLink>
                <Link href={"/admin/product/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"admin/news/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
