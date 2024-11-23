import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {VlogResponse} from "@/services/types/vlog";
import {VlogCategoryResponse} from "@/services/types/vlogCategory";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        status: number,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog_category/store", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        name: string,
        status: number,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/vlog_category/update", params)
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<VlogCategoryResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog_category/find/" + id)
        .then((res) => res?.data?.result?.data)
};

export const getList = async <T extends ServerResponse<VlogCategoryResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog_category/list")
        .then((res) => res?.data?.result?.data)
};
