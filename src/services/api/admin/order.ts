import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OrderResponse} from "@/services/types/order";
import {tableFetcher} from "@/shared/Table/fetcher";

export const orderTable = tableFetcher<OrderResponse>("admin/order/dataTable");

export const findById = async <T extends ServerResponse<OrderResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/order/" + id)
        .then((res) => res?.data?.result?.data)
};
export const updateStatus = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
        status: number | string
    }
) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/order/" + params.id + "/status", {status: params.status})
        .then((res) => res?.data)
};
export const registerTapin = async <T extends ServerResponse<unknown>>
(
    id: number, params: { status: number }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/order/" + id + "/tapin", params)
        .then((res) => res?.data)
};
export const cancelOrder = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
    }
) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/order/" + params.id + "/cancel")
        .then((res) => res?.data)
};
export const updateItem = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
        count: number
    }
) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/order/item/" + params.id, {count: params.count})
        .then((res) => res?.data)
};
export const deleteItem = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string
    }
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/order/item/" + params.id)
        .then((res) => res?.data)
};
export const digipayCalc = async <T extends ServerResponse<{ value: number }>>
(
    params: { start_date: string, end_date: string }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/order/digipay-calc", params)
        .then((res) => res?.data?.result?.data)
};
