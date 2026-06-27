"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/cast-category/TableRow";
import {castCategoryTable} from "@/services/api/admin/castCategory";

export default function Page() {


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته tajhizcast",
                href: "cast-category",
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت دسته cast
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/cast-category/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                fetcher={castCategoryTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
