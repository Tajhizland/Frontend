import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {NewsResponse} from "@/services/types/news";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title:string,
        url:string,
        published:number|string,
        image:unknown,
        content:string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/news/store" , params)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number|string,
        title:string,
        url:string,
        published:number|string,
        image:unknown,
        content:string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/news/update" , params)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<NewsResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/news/find/"+id )
        .then((res) => res?.data?.result?.data)
};
