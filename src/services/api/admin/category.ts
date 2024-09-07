import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CategoryResponse} from "@/services/types/category";

export const categoryList = async <T extends ServerResponse<CategoryResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/list")
        .then((res) => res?.data?.result)
};


export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name:number|string,
        url:string,
        image:unknown,
        parent_id:number|string,
        status:number|string,
        description:string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/store" , params)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number|string,
        name:number|string,
        url:string,
        image:unknown,
        parent_id:number|string,
        status:number|string,
        description:string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/update" , params)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CategoryResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/find/"+id )
        .then((res) => res?.data?.result?.data)
};
