import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OrderResponse} from "@/services/types/order";
import {tableFetcher} from "@/shared/Table/fetcher";
import {OrderDigipayCalcDto, OrderTapinDto, OrderUpdateItemDto, OrderUpdateStatusDto} from "@/services/types/order";

export const orderTable = tableFetcher<OrderResponse>("admin/order/dataTable");

export const findById = async <T extends ServerResponse<OrderResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/order/" + id)
        .then((res) => res?.data?.result?.data)
};
export const updateStatus = async <T extends ServerResponse<unknown>>
(id: number, dto: OrderUpdateStatusDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/order/" + id + "/status", {status: dto.status})
        .then((res) => res?.data)
};
export const registerTapin = async <T extends ServerResponse<unknown>>
(
    id: number, dto: OrderTapinDto
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/order/" + id + "/tapin", dto)
        .then((res) => res?.data)
};
export const cancelOrder = async <T extends ServerResponse<unknown>>
(id: number) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/order/" + id + "/cancel")
        .then((res) => res?.data)
};
export const updateItem = async <T extends ServerResponse<unknown>>
(id: number, dto: OrderUpdateItemDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/order/item/" + id, {count: dto.count})
        .then((res) => res?.data)
};
export const deleteItem = async <T extends ServerResponse<unknown>>
(id: number) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/order/item/" + id)
        .then((res) => res?.data)
};
export const digipayCalc = async <T extends ServerResponse<{ value: number }>>
(dto: OrderDigipayCalcDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/order/digipay-calc", dto)
        .then((res) => res?.data?.result?.data)
};
