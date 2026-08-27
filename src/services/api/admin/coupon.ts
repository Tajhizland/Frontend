import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CouponResponse} from "@/services/types/coupon";
import {tableFetcher} from "@/shared/Table/fetcher";
import {CouponStoreDto, CouponStoreGroupDto, CouponUpdateDto} from "@/services/types/coupon";

export const couponTable = tableFetcher<CouponResponse>("admin/coupon/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: CouponStoreDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/coupon", dto)
        .then((res) => res?.data);
};
export const storeGroup = async <T extends ServerResponse<unknown>>
(dto: CouponStoreGroupDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/coupon/group", dto)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: CouponUpdateDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/coupon/" + id, dto)
        .then((res) => res?.data);
};

export const find = async <T extends ServerResponse<CouponResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/coupon/" + id)
        .then((res) => res?.data?.result?.data)
};
export const generate = async <T extends ServerResponse<{ code: string }>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/coupon/generate")
        .then((res) => res?.data?.result?.data)
};

