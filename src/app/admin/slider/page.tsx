"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/slider/TableRow";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function Page() {

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "اسلایدر ها",
                href: "slider"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت اسلایدر ها
            </PageTitle>
            <PageLink>
                <Link href={"/admin/slider/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
                <Link href={"/admin/slider/sort-mobile"}>
                    <ButtonPrimary> سورت اسلایدر موبایل</ButtonPrimary>
                </Link>
                <Link href={"/admin/slider/sort-desktop"}>
                    <ButtonPrimary> سورت اسلایدر دسکتاپ</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                apiUrl={"admin/slider/dataTable"}
                columns={columns}
                buttons={buttons}
            />


        </Panel>
    </>)
}
