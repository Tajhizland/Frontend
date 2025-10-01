import {Column} from "@/shared/DataTable/type";
import {RoleResponse} from "@/services/types/role";
import {PermissionResponse} from "@/services/types/permission";

export const columns: Column<PermissionResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'name', header: 'نام', filterType: 'input', editable: true},
    {key: 'value', header: 'آدرس', filterType: 'input', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
