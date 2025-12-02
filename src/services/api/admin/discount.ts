import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DiscountResponse} from "@/services/types/discount";
import {DiscountItemResponse} from "@/services/types/discountItem";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        status: number,
        start_date: string,
        end_date: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/discount/store", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        title: string,
        status: number,
        start_date: string,
        end_date: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/discount/update", params)
        .then((res) => res?.data);
};

export const find = async <T extends ServerResponse<DiscountResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/discount/find/" + id)
        .then((res) => res?.data?.result?.data)
};

export const getItem = async <T extends ServerResponse<DiscountItemResponse[]>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/discount/item/" + id)
        .then((res) => res?.data?.result?.data)
};

export const setItem = async <T extends ServerResponse<unknown>>
(
    params: {
        discount_id: number,
        discount: {
            product_color_id: number,
            discount_price: number,
            discount_expire_time?: string,
        }[]

    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/discount/item/set", params)
        .then((res) => res?.data)
};

export const updateItem = async <T extends ServerResponse<unknown>>
(
    params: {
        discount: {
            id: number,
            discount_price: number,
        }[]

    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/discount/item/update", params)
        .then((res) => res?.data)
};

export const deleteItem = async <T extends ServerResponse<unknown>>
(
    id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/discount/item/" + id)
        .then((res) => res?.data)
};
