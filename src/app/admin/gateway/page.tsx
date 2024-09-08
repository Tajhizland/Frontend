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
                title: "تنظیمات درگاه پرداخت",
                href: "gateway"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت  درگاه پرداخت
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/gateway/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"admin/gateway/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
