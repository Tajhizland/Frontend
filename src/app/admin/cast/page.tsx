"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/cast/TableRow";
import {castTable} from "@/services/api/admin/cast";

export default function Page() {


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "cast",
                href: "cast"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت cast
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/cast/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                fetcher={castTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
