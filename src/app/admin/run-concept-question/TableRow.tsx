import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";

export const columns = defineColumns<RunConceptQuestionResponse>([
    { key: 'id', header: 'شناسه', editable: false },
    { key: 'status', header: 'وضعیت', editable: true },
    { key: 'level', header: 'لول', editable: true },
    { key: 'question', header: 'پرسش', editable: true },
    { key: 'parent_question', header: 'پرسش وابسته', editable: true },
    { key: 'parent_answer', header: 'پاسخ وابسته', editable: true },
    { key: 'created_at', header: 'تاریخ ایجاد', editable: false },
]);
export const actions = defineActions<RunConceptQuestionResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href: (row) => `run-concept-question/edit/${row.id}`,
    },
])
