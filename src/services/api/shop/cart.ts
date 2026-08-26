import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CartResponse} from "@/services/types/cart";

export const getCart = async <T extends ServerResponse<CartResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("cart")
        .then((res) => res?.data?.result?.data)
};

export const addToCart = async <T extends ServerResponse<unknown>>
(
    params: {
        productColorId: number,
        count: number,
        guaranty_id: number|undefined,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("cart", params)
        .then((res) => res?.data)
};
export const removeCartItem = async <T extends ServerResponse<unknown>>
(params: {
    productColorId: number ,
    guaranty_id: number|undefined,

}) => {
    return axios.delete<T, SuccessResponseType<T>>("cart/item", {data: params})
        .then((res) => res?.data)
};
export const increaseCartItem = async <T extends ServerResponse<unknown>>
(params: {
    productColorId: number,
    guaranty_id: number|undefined,

}) => {
    return axios.patch<T, SuccessResponseType<T>>("cart/increase", params)
        .then((res) => res?.data)
};
export const decreaseCartItem = async <T extends ServerResponse<unknown>>
(params: {
    productColorId: number ,
    guaranty_id: number|undefined,

}) => {
    return axios.patch<T, SuccessResponseType<T>>("cart/decrease", params)
        .then((res) => res?.data)
};
export const clearCart = async <T extends ServerResponse<unknown>>
(
    params: {
        productColorId: number
    }
) => {
    return axios.delete<T, SuccessResponseType<T>>("cart", {data: params})
        .then((res) => res?.data?.result)
};
export const mergeCart = async <T extends ServerResponse<unknown>>
(
    params: {
        items: {
            productColorId: number,
            count: number,
            guaranty_id?: number,
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("cart/merge", params)
        .then((res) => res?.data)
};
