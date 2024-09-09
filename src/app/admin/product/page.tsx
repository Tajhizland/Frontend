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

        const colors = [];
        for (let i = 0; i < e.colors.data.length; i++) {
            const colorData = {
                name: e.colors.data[i].color_name as string,
                code: e.colors.data[i].color_code as string,
                delivery_delay: e.colors.data[i].delivery_delay as number,
                status:e.colors.data[i].status as string,
                price: e.colors.data[i].price as number,
                discount: e.colors.data[i].discount as number,
                stock: e.colors.data[i].stock as number,
            };
            colors.push(colorData);
        }
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
                category_id: e.category_id,
                color:colors
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
