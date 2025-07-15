"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/run-concept-question/TableRow";
import {update} from "@/services/api/admin/runConceptQuestion";
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
            <DataTable
                onEdit={submit}
                apiUrl={"admin/run-concept-question/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
