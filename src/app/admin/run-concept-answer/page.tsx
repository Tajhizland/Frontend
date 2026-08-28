"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
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
                <ToolbarButton href="/admin/run-concept-answer/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
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
