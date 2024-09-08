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
                title: "تنظیمات روش ارسال",
                href: "delivery"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت  روش ارسال
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/delivery/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"admin/delivery/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
