import {ProductResponse} from "@/services/types/product";

export type SpecialProductResponse = {
    id: number;
    product_id: string;
    product?: ProductResponse;
    created_at: string;
    updated_at: string;
}
