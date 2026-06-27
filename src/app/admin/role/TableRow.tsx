import {defineColumns} from "@/shared/Table/types";
import {RoleResponse} from "@/services/types/role";

export const columns = defineColumns<RoleResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'name', header: 'نام', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
