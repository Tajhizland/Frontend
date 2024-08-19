import axios, {ServerResponse} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const getFavorite = async <T extends ServerResponse<ProductResponse>>
() => {
    return axios.get("favorite/show")
        .then((res) => res?.data?.result)
};
export const addToFavorite = async <T extends ServerResponse<unknown>>
(
    params: {
        productId: number
    }
) => {
    return axios.post("favorite/add-item" ,{params})
        .then((res) => res?.data?.result)
};
export const deleteFromFavorite = async <T extends ServerResponse<unknown>>
(
    params: {
        productId: number
    }
) => {
    return axios.post("favorite/remove-item" ,{params})
        .then((res) => res?.data?.result)
};
