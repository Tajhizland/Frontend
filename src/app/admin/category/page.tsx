"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/category/TableRow";
import {update} from "@/services/api/admin/category";
import {toast} from "react-hot-toast";
import {CategoryResponse} from "@/services/types/category";


export default function Page() {

    async function submit(e: CategoryResponse) {
        let response=await update(
            {
                id: e.id,
                name: e.name,
                url: e.url,
                status: e.status,
                image: null ,
                description: e.description,
                parent_id:e.parent_id
            }
        )
        toast.success(response?.message as string)
    }
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
                onEdit={submit}
                apiUrl={"admin/category/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
