export type  VlogCategoryResponse = {
    id: number,
    name: string;
    url: string;
    status: number;
    icon?: string;
    sort: number;
    created_at: number;
    updated_at: string,
}

export interface VlogCategoryStoreDto {
    name: string;
    url: string;
    icon?: File | null;
    status: number;
}

export interface VlogCategoryUpdateDto {
    name: string;
    url: string;
    icon?: File | null;
    status: number;
}
