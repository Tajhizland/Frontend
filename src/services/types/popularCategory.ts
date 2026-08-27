import {CategoryResponse} from "@/services/types/category";

export type PopularCategoryResponse = {
    id: number;
    category_id: number | string;
    category?: CategoryResponse;
    created_at: string;
    updated_at: string;
}

export interface PopularCategoryStoreDto {
    category_id: number | string;
}
