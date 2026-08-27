export type GuarantyResponse = {
    id: number;
    name: string;
    description: string;
    url: string;
    icon: string;
    status: number;
    free: number;
    created_at: string;
    updated_at: string;
};

export interface GuarantyStoreDto {
    name: string;
    url: string;
    free: number;
    status: number | string;
    icon: File | undefined;
    description: string;
}

export interface GuarantyUpdateDto {
    name: string;
    free: number;
    url: string;
    status: number | string;
    icon?: File | undefined;
    description: string;
}
