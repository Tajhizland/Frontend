import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PermissionResponse} from "@/services/types/permission";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        value: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/permission/store", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        name: string,
        value: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/permission/update", params)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<PermissionResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/permission/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const list = async <T extends ServerResponse<PermissionResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/permission/list")
        .then((res) => res?.data?.result?.data)
};
