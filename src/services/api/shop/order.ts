import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OrderResponse} from "@/services/types/order";

export const myOrders = async <T extends ServerResponse<OrderResponse[]>>
(
    page: number = 1
) => {
    return axios.get<T, SuccessResponseType<T>>("order?page=" + page)
        .then((res) => res?.data?.result)
};

export const findById = async <T extends ServerResponse<OrderResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("order/" + id)
        .then((res) => res?.data?.result?.data)
};
