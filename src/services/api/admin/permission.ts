import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PermissionResponse} from "@/services/types/permission";
import {tableFetcher} from "@/shared/Table/fetcher";
import {PermissionStoreDto, PermissionUpdateDto} from "@/services/types/permission";

export const permissionTable = tableFetcher<PermissionResponse>("admin/permission/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: PermissionStoreDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/permission", dto)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: PermissionUpdateDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/permission/" + id, dto)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<PermissionResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/permission/" + id)
        .then((res) => res?.data?.result?.data)
};
export const list = async <T extends ServerResponse<PermissionResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/permission/list")
        .then((res) => res?.data?.result?.data)
};
