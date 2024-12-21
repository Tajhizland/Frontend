"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/guaranty/TableRow";
import {update} from "@/services/api/admin/guaranty";
import {toast} from "react-hot-toast";
import {GuarantyResponse} from "@/services/types/guaranty";


export default function Page() {
    async function submit(e: GuarantyResponse) {
        let response = await update(
            {
                id: e.id,
                name: e.name,
                free:e.free,
                url: e.url,
                status: e.status,
                description: e.description,
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "گارانتی",
                href: "guaranty"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت گارانتی
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/guaranty/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/guaranty/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
