import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductVideoResponse} from "@/services/types/productVideo";


export const findById = async <T extends ServerResponse<ProductVideoResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/video/get/" + id)
        .then((res) => res?.data?.result?.data)
};
export const deleteProductVideo = async <T extends ServerResponse<unknown>>
(
    id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/product/video/delete/" + id)
        .then((res) => res?.data)
};

export const setProductVideo = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        vlogId: number,
        product_id: number
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/video/set2", params)
        .then((res) => res?.data)
};
