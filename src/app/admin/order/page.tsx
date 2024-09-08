"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/order/TableRow";

export default function Page() {
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "سفارشات",
                href: "order"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت سفارشات
            </PageTitle>

            <DataTable
                apiUrl={"admin/order/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
