import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";

export const dataTable = async <T extends ServerResponse<ProductResponse>>
() => {
    return axios.get("admin/product/dataTable/")
        .then((res) => res?.data?.result)
};

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        url: string,
        status: string,
        brand_id: string,
        description: string,
        meta_description: string,
        meta_title: string,
        study: string,
        categoryId: string,
        colors:{
            name:string,
            code:string,
            price:number|string,
            discount:number|string,
            stock:number|string,
            status:number|string,
            delivery_delay:number|string,
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/store",params)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<ProductResponse>>
(
    params: {
        id: number,
        name: string,
        url: string,
        status: string,
        brand_id: string,
        description: string,
        meta_description: string,
        meta_title: string,
        study: string,
        categoryId: string,
        colors:{
            name:string,
            code:string,
            price:number,
            discount:number,
            stock:number,
            status:number,
            delivery_delay:number,
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/store",params)
        .then((res) => res?.data?.result)
};
