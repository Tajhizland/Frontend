"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/run-concept-answer/TableRow";
import {runConceptAnswerTable, update} from "@/services/api/admin/runConceptAnswer";
import {toast} from "react-hot-toast";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";


export default function Page() {
    const submit = (e: RunConceptAnswerResponse) =>
        update(e.id, {answer: e.answer,
                status: e.status,
                price: e.price,
                run_concept_question_id: e.run_concept_question_id,
            });

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
                <Link href={"/admin/run-concept-answer/create"}>
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>
            <Table
                onEdit={submit}
                fetcher={runConceptAnswerTable}
                columns={columns}
                actions={actions}
            />
        </Panel>
    </>)
}
