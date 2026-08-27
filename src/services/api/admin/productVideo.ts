import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductVideoResponse} from "@/services/types/productVideo";
import {ProductVideoSetProductVideoDto} from "@/services/types/productVideo";


export const findById = async <T extends ServerResponse<ProductVideoResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/" + id + "/video")
        .then((res) => res?.data?.result?.data)
};
export const deleteProductVideo = async <T extends ServerResponse<unknown>>
(
    id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/product/video/" + id)
        .then((res) => res?.data)
};

export const setProductVideo = async <T extends ServerResponse<unknown>>
(dto: ProductVideoSetProductVideoDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/video/multi", dto)
        .then((res) => res?.data)
};
