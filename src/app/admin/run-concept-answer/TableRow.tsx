import {Column, DataTableButtons} from "@/shared/DataTable/type";
import {HiMiniPencil} from "react-icons/hi2";
import {UrlObject} from "node:url";
import {RunConceptAnswerResponse} from "@/services/types/runConceptAnswer";

export const columns: Column<RunConceptAnswerResponse>[] = [
    { key: 'id', header: 'شناسه', filterType: 'input', editable: false },
    { key: 'status', header: 'وضعیت', filterType: 'input', editable: true },
    { key: 'answer', header: 'پاسخ', filterType: 'input', editable: true },
    { key: 'run_concept_question_id', header: 'پرسش', filterType: 'input', editable: true },
    { key: 'price', header: 'هزینه', filterType: 'input', editable: true },
    { key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false },
];
export const buttons: DataTableButtons[] = [
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        type: "link",
        colorClass: "bg-white text-white border border-slate-900 outline-none ",
        href : (value: any): UrlObject => {
            return {
                pathname: 'run-concept-answer/edit/'+value,
            };
        }
    },
]
