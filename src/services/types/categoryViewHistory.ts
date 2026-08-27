import {CategoryResponse} from "@/services/types/category";
import {UserResponse} from "@/services/types/user";

export type categoryViewHistoryResponse = {
    id: number;
    category_id: string;
    user_id: string;
    category?: CategoryResponse;
    user?: UserResponse;
}

export interface CategoryViewHistoryStoreCategoryViewHistoryDto {
    category_id: number;
}

export interface CategoryViewHistoryStoreCategoryViewHistoryIpDto {
    category_id: number;
}
