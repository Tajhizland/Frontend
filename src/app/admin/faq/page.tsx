"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/faq/TableRow";
import {update, faqTable} from "@/services/api/admin/faq";
import {toast} from "react-hot-toast";
import {FaqResponse} from "@/services/types/faq";


export default function Page() {
    async function submit(e: FaqResponse) {
        let response = await update(
            {
                id: e.id,
                question: e.question,
                status: e.status,
                answer: e.answer,
            }
        )
        toast.success(response?.message as string)
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پرسش های متداول",
                href: "faq"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت پرسش های متداول
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/faq/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={faqTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
