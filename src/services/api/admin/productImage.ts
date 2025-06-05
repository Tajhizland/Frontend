import axios, { ServerResponse, SuccessResponseType } from "@/services/axios";
import { ProductImageResponse } from "@/services/types/productImage";

export const getByProductId = async <T extends ServerResponse<ProductImageResponse[]>>
    (
        id: number | string
    ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/image/get/" + id)
        .then((res) => res?.data?.result.data)
};
export const getImageSortByProductId = async <T extends ServerResponse<ProductImageResponse[]>>
    (
        id: number | string
    ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/image/get/" + id)
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
export const upload = async <T extends ServerResponse<unknown>>
    (
        params: {
            product_id: number,
            image: File[],
        }
    ) => {
    const formData = new FormData();
    formData.append('product_id', params.product_id + "");
    params.image.forEach((file) => {
        formData.append('image[]', file);
    });

    return axios.post<T, SuccessResponseType<T>>("admin/product/image/set/", formData,
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
    return axios.delete<T, SuccessResponseType<T>>("admin/product/image/delete/" + id)
        .then((res) => res?.data)
};
