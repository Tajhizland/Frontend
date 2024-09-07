import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BrandResponse} from "@/services/types/brand";

export const brandList = async <T extends ServerResponse<BrandResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/brand/list")
        .then((res) => res?.data?.result)
};

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name:string,
        url:string,
        status:number|string,
        image:unknown,
        description:string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/brand/store" , params)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number|string,
        name:string,
        url:string,
        status:number|string,
        image:unknown,
        description:string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/brand/update" , params)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<BrandResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/brand/find/"+id )
        .then((res) => res?.data?.result?.data)
};
