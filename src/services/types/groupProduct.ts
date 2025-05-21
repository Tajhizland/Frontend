import {ProductResponse} from "@/services/types/product";

export type GroupProductResponse = {
    id: number;
    group_id: number;
    product_id: number;
    group?: ProductResponse;
    product?: ProductResponse;
};
