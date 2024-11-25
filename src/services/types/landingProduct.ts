import {ProductResponse} from "@/services/types/product";
import {CategoryResponse} from "@/services/types/category";

export type LandingProductResponse = {
    id: number;
    product_id:number;
    landing_id:number;
    created_at: string;
    updated_at: string;
    product?: ProductResponse;
};
