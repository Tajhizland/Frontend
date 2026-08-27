import {ProductResponse} from "@/services/types/product";

export type SpecialProductResponse = {
    id: number;
    product_id: string;
    product?: ProductResponse;
    homepage: number;
    created_at: string;
    updated_at: string;
}

export interface SpecialProductStoreDto {
    product_id: string;
}

export interface SpecialProductUpdateHomepageDto {
    homepage: number;
}
