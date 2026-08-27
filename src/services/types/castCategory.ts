export type CastCategoryResponse = {
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface CastCategoryStoreDto {
    name: string;
    status: number;
    icon: File;
}

export interface CastCategoryUpdateDto {
    name: string;
    status: number;
    icon?: File;
}
