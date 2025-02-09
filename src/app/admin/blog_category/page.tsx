"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/blog_category/TableRow";
import {update} from "@/services/api/admin/blogCategory";
import {toast} from "react-hot-toast";
import {BlogCategoryResponse} from "@/services/types/blogCategory";


export default function Page() {
    async function submit(e: BlogCategoryResponse) {
        let response = await update(
            {
                id: e.id,
                name: e.name,
                status: e.status,
                url: e.url,
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی بلاگ",
                href: "blogCategory"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته بندی بلاگ
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/blog_category/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/blogCategory/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
