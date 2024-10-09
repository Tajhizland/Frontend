
import {OrderResponse} from "@/services/types/order";

export type OnHoldOrderResponse = {
    id: number;
    order_id: number;
    status: number;
    expire_date: string;
    review_date: string;
    created_at: string;
    updated_at: string;

    order?: OrderResponse;
};
