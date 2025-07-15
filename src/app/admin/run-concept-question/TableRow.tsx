import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import {RunConceptQuestionResponse} from "@/services/types/runConceptQuestion";

export const columns: Column<RunConceptQuestionResponse>[] = [
    { key: 'id', header: 'شناسه', filterType: 'input', editable: false },
    { key: 'status', header: 'وضعیت', filterType: 'input', editable: true },
    { key: 'level', header: 'لول', filterType: 'input', editable: true },
    { key: 'question', header: 'پرسش', filterType: 'input', editable: true },
    { key: 'parent_question', header: 'پرسش وابسته', filterType: 'input', editable: true },
    { key: 'parent_answer', header: 'پاسخ وابسته', filterType: 'input', editable: true },
    { key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false },
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href : (value: any): UrlObject => {
            return {
                pathname: 'run-concept-question/edit/'+value,
            };
        }
    },
]
