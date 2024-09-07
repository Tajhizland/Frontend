"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/news/TableRow";


export default function Page() {

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "بلاگ",
                href: "news"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت بلاگ
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/news/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"admin/news/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
