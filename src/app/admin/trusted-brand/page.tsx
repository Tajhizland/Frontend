"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/trusted-brand/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Route} from "next";
import {toast} from "react-hot-toast";
import {deleteTrustedBrand} from "@/services/api/admin/trustedBrand";

export default function Page() {
    async function removeItem(id: any) {
        let response = await deleteTrustedBrand(id);
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "برند های تجهیز شده",
                href: "trusted-brand"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت برند های تجهیز شده
            </PageTitle>
            <PageLink>
                <Link href={"/admin/trusted-brand/create" as Route}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"admin/trusted-brand/dataTable"}
                columns={columns}
                buttons={buttons}
                onDelete={removeItem}
            />
        </Panel>
    </>)
}
