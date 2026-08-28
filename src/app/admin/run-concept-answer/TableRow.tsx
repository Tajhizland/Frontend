import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";

export const columns = defineColumns<RunConceptAnswerResponse>([
    { key: 'id', header: 'شناسه', editable: false },
    { key: 'status', header: 'وضعیت', editable: true },
    { key: 'answer', header: 'پاسخ', editable: true },
    { key: 'run_concept_question_id', header: 'پرسش', editable: true },
    { key: 'price', header: 'هزینه', editable: true },
    { key: 'created_at', filter: 'date', header: 'تاریخ ایجاد', editable: false },
]);
export const actions = defineActions<RunConceptAnswerResponse>([
    {
        label: <HiMiniPencil className={"w-4 h-4"} title={"ویرایش"}/>,
        href: (row) => `run-concept-answer/edit/${row.id}`,
    },
])
