"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/concept/TableRow";
 import { toast } from "react-hot-toast";
import {Route} from "next";
import {updateLanding} from "@/services/api/admin/landing";
import {LandingResponse} from "@/services/types/landing";

export default function Page() {

    async function submit(e: LandingResponse) {
        let response=await updateLanding(
            {
                id: e.id,
                title: e.title,
                status: e.status,
                url: e.url,
                description:e.description
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "لندینگ",
                href: "landing"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت لندینگ
            </PageTitle>
            <PageLink>
                <Link href={"/admin/landing/create" as Route}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
            onEdit={submit}
                apiUrl={"admin/landing/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
