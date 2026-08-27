"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/page/TableRow";
 import {update, pageTable} from "@/services/api/admin/page";
import {toast} from "react-hot-toast";
import {PageResponse} from "@/services/types/page";


export default function Page() {
    const submit = (e: PageResponse) =>
        update(e.id, {title: e.title,
                url: e.url,
                status: e.status,
                image: null ,
                content: e.content,
            });
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "صفحه",
                href: "page"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت صفحه
            </PageTitle>
            <PageLink>
                <Link href={"/admin/page/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={pageTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
