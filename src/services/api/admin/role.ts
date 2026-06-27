import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {RoleResponse} from "@/services/types/role";
import {tableFetcher} from "@/shared/Table/fetcher";

export const roleTable = tableFetcher<RoleResponse>("admin/role/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        permission: number[],
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/role/store", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        name: string,
        permission: number[],
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/role/update", params)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<RoleResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/role/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const list = async <T extends ServerResponse<RoleResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/role/list")
        .then((res) => res?.data?.result?.data)
};
