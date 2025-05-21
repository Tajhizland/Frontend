import {GroupProductResponse} from "@/services/types/groupProduct";

export type GroupFieldResponse = {
    id: number;
    title: string;
    status: number;
    created_at: string;
    updated_at: string;
    groupProduct?: GroupProductResponse;
};
