import {ProductResponse} from "@/services/types/product";

export type SpecialProductResponse = {
    id: number;
    product_id: string;
    product?: ProductResponse;
    homepage: number;
    created_at: string;
    updated_at: string;
}
