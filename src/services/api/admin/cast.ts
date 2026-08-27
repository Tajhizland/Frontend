import axios, { ServerResponse, SuccessResponseType } from "@/services/axios";
import { CastResponse } from "@/services/types/cast";
import {tableFetcher} from "@/shared/Table/fetcher";
import {CastStoreDto, CastUpdateDto} from "@/services/types/cast";
import {UploadProgress, toFormData} from "@/services/http";

export const castTable = tableFetcher<CastResponse>("admin/cast/dataTable");


export const store = async <T extends ServerResponse<unknown>>
    (dto: CastStoreDto, onProgress?: UploadProgress) => {

    return axios.post<T, SuccessResponseType<T>>("admin/cast", toFormData(dto),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
    (id: number, dto: CastUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/cast/" + id, toFormData(dto, "PUT"),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }, onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CastResponse>>
    (
        id: number
    ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/cast/" + id)
        .then((res) => res?.data?.result?.data)
};