import {Identified, Timestamps} from "@/services/http";
import {UserResponse} from "@/services/types/user";

export interface CouponBase {
    code: string;
    start_time: string;
    end_time: string;
    status: number;
    price: number;
    percent: number;
    min_order_value: number;
    max_order_value: number;
    user_id: number;
}

export interface CouponResponse extends CouponBase, Identified, Timestamps {
    start_time_fa: string;
    end_time_fa: string;
    created_at_fa: string;
    user?: UserResponse;
}

export interface CouponStoreDto extends CouponBase {}

export interface CouponStoreGroupDto {
    start_time: string;
    end_time: string;
    status: number;
    price: number;
    percent: number;
    min_order_value: number;
    max_order_value: number;
    userIds: number[];
    send_sms?: boolean;
    message?: string;
}

export type CouponUpdateDto = CouponStoreDto;
