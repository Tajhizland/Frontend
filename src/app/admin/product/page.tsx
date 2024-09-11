"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/product/TableRow";
import {update} from "@/services/api/admin/product";
import {toast} from "react-hot-toast";
import {ProductResponse} from "@/services/types/product";

export default function Page() {
    async function submit(e: ProductResponse) {
 
        let response = await update(
            {
                id: e.id,
                name: e.name,
                url:  e.url,
                status:  e.status,
                brand_id:  e.brand_id,
                description:  e.description,
                meta_description: e.meta_description,
                meta_title:  e.meta_title,
                study:  e.study,
                categoryId: e.category_id +"" as string, 
            }
        )
        toast.success(response?.message as string)
    }
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
                onEdit={submit}
                apiUrl={"admin/product/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
