"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/brand/TableRow";

export default function page() {

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
            </PageLink>
            <DataTable
                apiUrl={"admin/brand/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
