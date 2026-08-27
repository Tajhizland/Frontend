import {PermissionResponse} from "@/services/types/permission";

export type RoleResponse = {
    id: number,
    name: string;
    permissions?: PermissionResponse[];
    created_at: string,
    updated_at: string,
}

export interface RoleStoreDto {
    name: string;
    permission: number[];
}

export interface RoleUpdateDto {
    name: string;
    permission: number[];
}
