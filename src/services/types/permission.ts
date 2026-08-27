import {Identified, Timestamps} from "@/services/http";
export interface PermissionBase {
    name: string;
    value: string;
}

export interface PermissionResponse extends PermissionBase, Identified, Timestamps {}

export interface PermissionStoreDto extends PermissionBase {}

export type PermissionUpdateDto = PermissionStoreDto;
