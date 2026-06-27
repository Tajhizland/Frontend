import {defineColumns} from "@/shared/Table/types";
import {RoleResponse} from "@/services/types/role";
import {PermissionResponse} from "@/services/types/permission";
import {PhoneBockResponse} from "@/services/types/phoneBock";

export const columns = defineColumns<PhoneBockResponse>([

    {key: 'id', header: 'شناسه', editable: false},
    {key: 'name', header: 'نام', editable: true},
    {key: 'mobile', header: 'موبایل', editable: true},
    {key: 'created_at', header: 'تاریخ ایجاد', editable: false},
]);
