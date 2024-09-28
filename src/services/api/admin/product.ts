import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const dataTable = async <T extends ServerResponse<ProductResponse>>
() => {
    return axios.get("admin/product/dataTable/")
        .then((res) => res?.data?.result)
};

export const findById = async <T extends ServerResponse<ProductResponse>>
(id:number|string) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/find/"+id)
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        url: string,
        status:number|string,
        brand_id: string,
        description: string,
        meta_description: string,
        meta_title: string,
        study: string,
        categoryId: string, 
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/store",params)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number|string,
        name: string,
        url: string,
        status:number|string,
        brand_id: string,
        description: string,
        meta_description: string,
        meta_title: string,
        study: string,
        categoryId: string,
       
    }

) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/update",params)
        .then((res) => res?.data)
};

export const search = async <T extends ServerResponse<ProductResponse[]>>
(
    params: {
        query: string, 
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/search/product",params)
        .then((res) => res?.data?.result?.data)
};
