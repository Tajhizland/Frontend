export type PermissionResponse = {
    id: number,
    name:string ;
    value:string ;
    created_at: string,
    updated_at: string,
}

export interface PermissionStoreDto {
    name: string;
    value: string;
}

export interface PermissionUpdateDto {
    name: string;
    value: string;
}
