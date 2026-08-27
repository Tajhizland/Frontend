import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {MenuResponse} from "@/services/types/menu";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {MenuFastUpdateDto, MenuStoreDto, MenuUpdateDto} from "@/services/types/menu";
import {UploadProgress, toFormData} from "@/services/http";

export const menuTable = tableFetcher<MenuResponse>("admin/menu/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: MenuStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/menu", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const fastUpdate = async <T extends ServerResponse<unknown>>
(id: number, dto: MenuFastUpdateDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/menu/" + id, dto)
        .then((res) => res?.data);
};


export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: MenuUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/menu/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<MenuResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/menu/" + id)
        .then((res) => res?.data?.result?.data)
};
export const deleteBanner = async <T extends ServerResponse<unknown>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/menu/" + id + "/banner")
        .then((res) => res?.data)
};

export const menuList = async <T extends ServerResponse<MenuResponse[]>>
( ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/menu/list")
        .then((res) => res?.data?.result?.data)
};

export const removeMenuItem = async <T extends ServerResponse<unknown>>
(
    id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/menu/" + id)
        .then((res) => res?.data)
};
