import {defineColumns} from "@/shared/Table/types";
import {RoleResponse} from "@/services/types/role";
import {PermissionResponse} from "@/services/types/permission";

export const columns = defineColumns<PermissionResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'name', header: 'نام', editable: true},
    {key: 'value', header: 'آدرس', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
