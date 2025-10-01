import {PermissionResponse} from "@/services/types/permission";

export type RoleResponse = {
    id: number,
    name: string;
    permissions?: PermissionResponse[];
    created_at: string,
    updated_at: string,
}
