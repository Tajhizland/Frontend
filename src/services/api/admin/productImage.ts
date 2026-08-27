import axios, { ServerResponse, SuccessResponseType } from "@/services/axios";
import { ProductImageResponse } from "@/services/types/productImage";
import {ProductImageUploadDto} from "@/services/types/productImage";
import {toFormData} from "@/services/http";

export const getByProductId = async <T extends ServerResponse<ProductImageResponse[]>>
    (
        id: number | string
    ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/" + id + "/image")
        .then((res) => res?.data?.result.data)
};
export const getImageSortByProductId = async <T extends ServerResponse<ProductImageResponse[]>>
    (
        id: number | string
    ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/" + id + "/image")
        .then((res) => res?.data?.result)
};
export const sortImage = async <T extends ServerResponse<unknown>>
(
    param:{
        image: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/image/sort",param)
        .then((res) => res?.data)
};
export const setImageColor = async <T extends ServerResponse<unknown>>
(
    param: {
        product_id: number
        image: {
            id: number
            product_color_id: number | null
        }[]
    }
) => {
    return axios.put<T, SuccessResponseType<T>>("admin/product/image/color", param)
        .then((res) => res?.data)
};

export const upload = async <T extends ServerResponse<unknown>>
    (dto: ProductImageUploadDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/image", toFormData(dto),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res?.data)
};

export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/product/image/" + id)
        .then((res) => res?.data)
};
