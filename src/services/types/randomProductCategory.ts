import {CategoryResponse} from "@/services/types/category";

export type RandomProductCategoryResponse = {
    id: number;
    category_id: number | string;
    category: CategoryResponse;
    created_at: string;
    updated_at: string;
}

export interface RandomProductCategoryStoreDto {
    category_id: number | string;
}
