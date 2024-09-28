import {CategoryResponse} from "@/services/types/category";

export type PopularCategoryResponse = {
    id: number;
    category_id: string;
    category?: CategoryResponse;
    created_at: string;
    updated_at: string;
}
