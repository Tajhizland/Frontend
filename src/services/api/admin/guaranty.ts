import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {GuarantyResponse} from "@/services/types/guaranty";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {GuarantyStoreDto, GuarantyUpdateDto} from "@/services/types/guaranty";
import {UploadProgress, toFormData} from "@/services/http";

export const guarantyTable = tableFetcher<GuarantyResponse>("admin/guaranty/dataTable");

export const guarantyLists = async <T extends ServerResponse<GuarantyResponse[]>>
() => {

    return axios.get<T, SuccessResponseType<T>>("admin/guaranty/list")
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(dto: GuarantyStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/guaranty", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data)
};
export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: GuarantyUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/guaranty/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<GuarantyResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/guaranty/" + id)
        .then((res) => res?.data?.result?.data)
};
