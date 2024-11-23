"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/vlog_category/TableRow";
 import {update} from "@/services/api/admin/vlogCategory";
import {toast} from "react-hot-toast";
import {VlogCategoryResponse} from "@/services/types/vlogCategory";


export default function Page() {
    async function submit(e: VlogCategoryResponse) {
        let response=await update(
            {
                id: e.id,
                name: e.name as string,
                status: Number(e.status) ,
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی ولاگ",
                href: "vlog_category"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته بندی ولاگ
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/vlog_category/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/vlog_category/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
