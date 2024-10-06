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
import {ConceptResponse} from "@/services/types/concept";
import {fastUpdate} from "@/services/api/admin/concept";
import {Route} from "next";

export default function Page() {

    async function submit(e: ConceptResponse) {
        let response=await fastUpdate(
            {
                id: e.id,
                title: e.title,
                status: e.status,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "concept",
                href: "concept"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت concept
            </PageTitle>
            <PageLink>
                <Link href={"/admin/concept/create" as Route}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
            onEdit={submit}
                apiUrl={"admin/concept/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
