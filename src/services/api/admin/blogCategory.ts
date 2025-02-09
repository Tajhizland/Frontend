import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BlogCategoryResponse} from "@/services/types/blogCategory";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        url: string,
        status: number,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/blogCategory/store", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        name: string,
        url: string,
        status: number,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/blogCategory/update", params)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<BlogCategoryResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/blogCategory/find/" + id)
        .then((res) => res?.data?.result?.data)
};
