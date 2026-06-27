"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/campaign/TableRow";
import {campaignTable} from "@/services/api/admin/campaign";

export default function Page() {


    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "جشنواره",
                href: "campaign"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت جشنواره
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/campaign/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                fetcher={campaignTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
