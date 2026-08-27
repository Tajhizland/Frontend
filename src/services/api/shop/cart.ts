import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CartResponse} from "@/services/types/cart";
import {CartAddToCartDto, CartClearCartDto, CartDecreaseCartItemDto, CartIncreaseCartItemDto, CartMergeCartDto, CartRemoveCartItemDto} from "@/services/types/cart";

export const getCart = async <T extends ServerResponse<CartResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("cart")
        .then((res) => res?.data?.result?.data)
};

export const addToCart = async <T extends ServerResponse<unknown>>
(dto: CartAddToCartDto) => {
    return axios.post<T, SuccessResponseType<T>>("cart", dto)
        .then((res) => res?.data)
};
export const removeCartItem = async <T extends ServerResponse<unknown>>
(dto: CartRemoveCartItemDto) => {
    return axios.delete<T, SuccessResponseType<T>>("cart/item", {data: dto})
        .then((res) => res?.data)
};
export const increaseCartItem = async <T extends ServerResponse<unknown>>
(dto: CartIncreaseCartItemDto) => {
    return axios.patch<T, SuccessResponseType<T>>("cart/increase", dto)
        .then((res) => res?.data)
};
export const decreaseCartItem = async <T extends ServerResponse<unknown>>
(dto: CartDecreaseCartItemDto) => {
    return axios.patch<T, SuccessResponseType<T>>("cart/decrease", dto)
        .then((res) => res?.data)
};
export const clearCart = async <T extends ServerResponse<unknown>>
(dto: CartClearCartDto) => {
    return axios.delete<T, SuccessResponseType<T>>("cart", {data: dto})
        .then((res) => res?.data?.result)
};
export const mergeCart = async <T extends ServerResponse<unknown>>
(dto: CartMergeCartDto) => {
    return axios.post<T, SuccessResponseType<T>>("cart/merge", dto)
        .then((res) => res?.data)
};
