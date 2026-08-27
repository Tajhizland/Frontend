import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {RoleResponse} from "@/services/types/role";
import {tableFetcher} from "@/shared/Table/fetcher";
import {RoleStoreDto, RoleUpdateDto} from "@/services/types/role";

export const roleTable = tableFetcher<RoleResponse>("admin/role/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: RoleStoreDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/role", dto)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: RoleUpdateDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/role/" + id, dto)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<RoleResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/role/" + id)
        .then((res) => res?.data?.result?.data)
};
export const list = async <T extends ServerResponse<RoleResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/role/list")
        .then((res) => res?.data?.result?.data)
};
