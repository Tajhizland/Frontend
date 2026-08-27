"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/concept/TableRow";
 import { toast } from "react-hot-toast";
import {ConceptResponse} from "@/services/types/concept";
import {fastUpdate, conceptTable} from "@/services/api/admin/concept";

export default function Page() {

    const submit = (e: ConceptResponse) =>
        fastUpdate(e.id, {title: e.title,
                status: e.status,
            });

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "concept",
                href: "concept"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت concept
            </PageTitle>
            <PageLink>
                <Link href={"/admin/concept/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
            onEdit={submit}
                fetcher={conceptTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
