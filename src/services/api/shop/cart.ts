import axios, {ServerResponse} from "@/services/axios";
import {CartResponse} from "@/services/types/cart";

export const getCart = async <T extends ServerResponse<CartResponse>>
() => {
    return axios.get("cart/get")
        .then((res) => res?.data?.result)
};

export const addToCart = async <T extends ServerResponse<unknown>>
(
    params: {
        productColorId: number,
        count: number
    }
) => {
    return axios.post("cart/add-to-cart", {params})
        .then((res) => res?.data?.result)
};
export const removeCartItem = async <T extends ServerResponse<unknown>>
(params: {
    productColorId: number
}) => {
    return axios.post("cart/remove-item", {params})
        .then((res) => res?.data?.result)
};
export const increaseCartItem = async <T extends ServerResponse<unknown>>
(params: {
    productColorId: number
}) => {
    return axios.post("cart/increase", {params})
        .then((res) => res?.data?.result)
};
export const decreaseCartItem = async <T extends ServerResponse<unknown>>
(params: {
    productColorId: number
}) => {
    return axios.post("cart/decrease", {params})
        .then((res) => res?.data?.result)
};
export const clearCart = async <T extends ServerResponse<unknown>>
(
    params: {
        productColorId: number
    }
) => {
    return axios.post("cart/clear-all", {params})
        .then((res) => res?.data?.result)
};
