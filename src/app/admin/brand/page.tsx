"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/brand/TableRow";
import { update } from "@/services/api/admin/brand";
import { toast } from "react-hot-toast";
import {BrandResponse} from "@/services/types/brand";

export default function Page() {

    async function submit(e: BrandResponse) {
        let response=await update(
            {
                id: e.id,
                name: e.name,
                url: e.url,
                status: e.status,
                image: null,
                description: e.description,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "برند",
                href: "brand"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت برند
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/brand/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
                <Link href={{pathname: "/admin/brand/sort"}}>
                    <ButtonPrimary> سورت کردن</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
            onEdit={submit}
                apiUrl={"admin/brand/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
