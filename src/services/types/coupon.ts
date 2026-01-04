import {UserResponse} from "@/services/types/user";

export type CouponResponse = {
    id: number,
    code: string;
    start_time: string;
    end_time: string;
    start_time_fa: string;
    end_time_fa: string;
    created_at_fa: string;
    status: number;
    price: number;
    percent: number;
    min_order_value: number;
    max_order_value: number;
    user_id: number;
    user?: UserResponse;
    created_at: string,
    updated_at: string,
}
