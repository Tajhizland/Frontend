import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OrderResponse} from "@/services/types/order";

export const findById = async <T extends ServerResponse<OrderResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/order/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const updateStatus = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
        status: number | string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/order/update/status", params)
        .then((res) => res?.data)
};
export const registerTapin = async <T extends ServerResponse<unknown>>
(
    id: number, params: { status: number }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/order/tapin/" + id, params)
        .then((res) => res?.data)
};
