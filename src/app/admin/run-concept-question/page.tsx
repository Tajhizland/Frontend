"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/run-concept-question/TableRow";
import {update, runConceptQuestionTable} from "@/services/api/admin/runConceptQuestion";
import {toast} from "react-hot-toast";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";


export default function Page() {
    async function submit(e: RunConceptQuestionResponse) {
        let response = await update(
            {
                id: e.id,
                question: e.question,
                parent_question: e.parent_question,
                parent_answer: e.parent_answer,
                status: e.status,
                level: e.level,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "سوالات",
                href: "run-concept-question"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت سوالات
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/run-concept-question/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={runConceptQuestionTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
