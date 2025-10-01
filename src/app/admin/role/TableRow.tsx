import {Column} from "@/shared/DataTable/type";
import {RoleResponse} from "@/services/types/role";

export const columns: Column<RoleResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'name', header: 'نام', filterType: 'input', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
