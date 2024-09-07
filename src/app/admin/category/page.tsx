"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/category/TableRow";


export default function Page() {


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
                <Link href={{pathname: "/admin/category/create"}}>
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
