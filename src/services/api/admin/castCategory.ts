import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CastResponse} from "@/services/types/cast";
import {CastCategoryResponse} from "@/services/types/castCategory";


export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        status: number,

    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/cast-category/store", params,)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        status: number,
        id: number,

    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/cast-category/update", params,)
        .then((res) => res?.data)
};


export const get = async <T extends ServerResponse<CastCategoryResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/cast-category/get")
        .then((res) => res?.data?.result?.data)
};

export const findById = async <T extends ServerResponse<CastCategoryResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/cast-category/find/" + id)
        .then((res) => res?.data?.result?.data)
};