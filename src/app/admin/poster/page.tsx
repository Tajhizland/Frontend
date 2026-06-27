"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/poster/TableRow";
import {posterTable} from "@/services/api/admin/poster";
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
            <Table
                fetcher={posterTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
