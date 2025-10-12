import {Column} from "@/shared/DataTable/type";
import {RoleResponse} from "@/services/types/role";
import {PermissionResponse} from "@/services/types/permission";
import {PhoneBockResponse} from "@/services/types/phoneBock";

export const columns: Column<PhoneBockResponse>[] = [

    {key: 'id', header: 'شناسه', filterType: 'input', editable: false},
    {key: 'name', header: 'نام', filterType: 'input', editable: true},
    {key: 'mobile', header: 'موبایل', filterType: 'input', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', filterType: 'input', editable: false},
];
