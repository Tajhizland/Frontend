"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/poster/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Route} from "next";

export default function Page() {
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پوستر ها",
                href: "poster"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت پوستر ها
            </PageTitle>
            <PageLink>
                <Link href={"/admin/poster/create" as Route}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"admin/poster/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
