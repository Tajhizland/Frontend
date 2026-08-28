"use client";
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import { LuPlus } from "react-icons/lu";
import ToolbarButton from "@/shared/Toolbar/ToolbarButton";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import PageLink from "@/shared/PageLink/PageLink";
import Table from "@/shared/Table/Table";
import {actions, columns} from "@/app/admin/run-concept-question/TableRow";
import {update, runConceptQuestionTable} from "@/services/api/admin/runConceptQuestion";
import {toast} from "react-hot-toast";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";


export default function Page() {
    const submit = (e: RunConceptQuestionResponse) =>
        update(e.id, {question: e.question,
                parent_question: e.parent_question,
                parent_answer: e.parent_answer,
                status: e.status,
                level: e.level,
            });

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
                <ToolbarButton href="/admin/run-concept-question/create" icon={<LuPlus className="w-4 h-4" />}>ایجاد</ToolbarButton>
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
