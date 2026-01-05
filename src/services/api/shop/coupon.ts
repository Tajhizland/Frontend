import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CouponResponse} from "@/services/types/coupon";

export const check = async <T extends ServerResponse<CouponResponse>>
(
    code: string
) => {
    return axios.post<T, SuccessResponseType<T>>("coupon/check",{code:code})
        .then((res) => res?.data?.result?.data)
};
