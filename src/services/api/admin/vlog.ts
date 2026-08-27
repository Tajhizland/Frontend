import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {VlogResponse} from "@/services/types/vlog";
import {BrandResponse} from "@/services/types/brand";
import {VideoStatusResponse} from "@/services/types/upload";
import {tableFetcher} from "@/shared/Table/fetcher";
import {VlogStoreDirectDto, VlogStoreDto, VlogUpdateDto} from "@/services/types/vlog";
import {UploadProgress, toFormData} from "@/services/http";

export const vlogTable = tableFetcher<VlogResponse>("admin/vlog/dataTable");

/**
 * ثبت ولاگ با ویدیویی که از قبل مستقیماً روی S3 آپلود شده است.
 * فقط کلید فایل فرستاده می‌شود، پس این درخواست چند کیلوبایت بیشتر نیست.
 */
export const storeDirect = async <T extends ServerResponse<VlogResponse>>
(dto: VlogStoreDirectDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog/direct", toFormData(dto))
        .then((res) => res?.data);
};

/** وضعیت ترنسکد ویدیو؛ برای نمایش مرحله‌ی «در حال پردازش» بعد از آپلود */
export const videoStatus = async <T extends ServerResponse<VideoStatusResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog/" + id + "/video-status")
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(dto: VlogStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog", toFormData(dto),
        {
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            }
        })
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: VlogUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog/" + id, toFormData(dto, "PUT"),
        {
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            }
        })
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<VlogResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog/" + id)
        .then((res) => res?.data?.result?.data)
};

export const search = async <T extends ServerResponse<VlogResponse[]>>
(
    query:string
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog/search" ,{query:query})
        .then((res) => res?.data?.result?.data)
};

export const vlogList = async <T extends ServerResponse<VlogResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog/list")
        .then((res) => res?.data?.result)
};

export const sortVlog = async <T extends ServerResponse<unknown>>
(
    param:{
        vlog: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog/sort",param)
        .then((res) => res?.data)
};
