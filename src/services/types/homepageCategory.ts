import {CategoryResponse} from "@/services/types/category";

export type HomepageCategoryResponse = {
    id: number;
    category_id: number | string;
    icon: string;
    category: CategoryResponse;
    created_at: string;
    updated_at: string;
}

export interface HomepageCategoryStoreDto {
    category_id: number | string;
}

export interface HomepageCategorySetIconDto {
    icon: File;
}
