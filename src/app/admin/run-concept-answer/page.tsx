"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import DataTable from "@/shared/DataTable/DataTable";
import {buttons, columns} from "@/app/admin/run-concept-answer/TableRow";
import {update} from "@/services/api/admin/runConceptAnswer";
import {toast} from "react-hot-toast";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";


export default function Page() {
    async function submit(e: RunConceptAnswerResponse) {
        let response = await update(
            {
                id: e.id,
                answer: e.answer,
                status: e.status,
                price: e.price,
                run_concept_question_id: e.run_concept_question_id,
            }
        )
        toast.success(response?.message as string)
    }

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "سوالات",
                href: "run-concept-answer"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت سوالات
            </PageTitle>
            <PageLink>
                <Link href={{pathname: "/admin/run-concept-answer/create"}}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <DataTable
                onEdit={submit}
                apiUrl={"admin/run-concept-answer/dataTable"}
                columns={columns}
                buttons={buttons}
            />
        </Panel>
    </>)
}
