import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CouponResponse} from "@/services/types/coupon";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
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
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/coupon/store", params)
        .then((res) => res?.data);
};
export const storeGroup = async <T extends ServerResponse<unknown>>
(
    params: {
        start_time: string;
        end_time: string;
        status: number;
        price: number;
        percent: number;
        min_order_value: number;
        max_order_value: number;
        userIds: number[]
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/coupon/store-group", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
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
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/coupon/update", params)
        .then((res) => res?.data);
};

export const find = async <T extends ServerResponse<CouponResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/coupon/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const generate = async <T extends ServerResponse<{ code: string }>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/coupon/generate")
        .then((res) => res?.data?.result?.data)
};

