import {defineColumns, defineActions} from "@/shared/Table/types";
import {HiMiniPencil} from "react-icons/hi2";
import Badge from "@/shared/Badge/Badge";
import {DictionaryResponse} from "@/services/types/dictionary";

export const columns = defineColumns<DictionaryResponse>([
    {key: 'id', header: 'شناسه', editable: false},
    {key: 'original_word', header: 'کلمه اصلی', editable: true},
    {key: 'mean', header: 'معنی', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
export const actions = defineActions<DictionaryResponse>([
    {
        label: <HiMiniPencil className={"text-black w-5 h-5"} title={"ویرایش"}/>,
        href: (row) => `dictionary/edit/${row.id}`,
    },

])
