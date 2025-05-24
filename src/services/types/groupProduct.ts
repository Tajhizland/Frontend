import {ProductResponse} from "@/services/types/product";
import {GroupFieldValueResponse} from "@/services/types/groupFieldValue";

export type GroupProductResponse = {
    id: number;
    group_id: number;
    product_id: number;
    group?: ProductResponse;
    product?: ProductResponse;
    value?: { data: GroupFieldValueResponse[] };
};
