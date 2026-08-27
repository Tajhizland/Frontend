"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/landing/TableRow";
 import { toast } from "react-hot-toast";
import {landingTable, updateLanding} from "@/services/api/admin/landing";
import {LandingResponse} from "@/services/types/landing";

export default function Page() {

    const submit = (e: LandingResponse) =>
        updateLanding(e.id, {title: e.title,
                status: e.status,
                url: e.url,
                description:e.description
            });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "لندینگ",
                href: "landing"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت لندینگ
            </PageTitle>
            <PageLink>
                <Link href={"/admin/landing/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
            onEdit={submit}
                fetcher={landingTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
