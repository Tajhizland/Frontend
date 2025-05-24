import {GroupProductResponse} from "@/services/types/groupProduct";
import {GroupFieldResponse} from "@/services/types/groupField";

export type GroupFieldValueResponse = {
    id: number;
    value: string;

    group_product_id: number;
    group_field_id: number;

    created_at: string;
    updated_at: string;
    groupProduct?: GroupProductResponse;
    groupField?: GroupFieldResponse;
};

export type GroupFieldValuePage = {
    value: { data: GroupProductResponse[] };
    fields: { data: GroupFieldResponse[] };
};
