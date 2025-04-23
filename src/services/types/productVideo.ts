import {VlogResponse} from "@/services/types/vlog";

export type ProductVideoResponse = {
    id: number;
    product_id: number;
    vlog_id: number;
    title: string;
    created_at: string;
    updated_at: string;
    vlog?: VlogResponse;
};
