import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        product_id: string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/special_product/add", params)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/special_product/delete/"+id)
        .then((res) => res?.data)
};

export const updateHomepage = async <T extends ServerResponse<unknown>>
(params:{
     id: number,
     homepage: number,
 }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/special_product/homepage/",params)
        .then((res) => res?.data)
};

export const list = async <T extends ServerResponse<ProductResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/special_product/list")
        .then((res) => res?.data?.result)
};

export const sort = async <T extends ServerResponse<ProductResponse[]>>
(
    param:{
        special: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/special_product/sort",param)
        .then((res) => res?.data)
};
