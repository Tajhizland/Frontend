import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {VlogResponse} from "@/services/types/vlog";
import {BrandResponse} from "@/services/types/brand";
import {VideoStatusResponse} from "@/services/types/upload";
import {tableFetcher} from "@/shared/Table/fetcher";

export const vlogTable = tableFetcher<VlogResponse>("admin/vlog/dataTable");

/**
 * ثبت ولاگ با ویدیویی که از قبل مستقیماً روی S3 آپلود شده است.
 * فقط کلید فایل فرستاده می‌شود، پس این درخواست چند کیلوبایت بیشتر نیست.
 */
export const storeDirect = async <T extends ServerResponse<VlogResponse>>
(
    params: {
        title: string,
        url: string,
        status: number | string,
        categoryId: number | string,
        videoKey: string,
        poster: File,
        description: string,
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('description', params.description);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    formData.append('categoryId', params.categoryId.toString());
    formData.append('videoKey', params.videoKey);
    formData.append('poster', params.poster);

    return axios.post<T, SuccessResponseType<T>>("admin/vlog/store-direct", formData)
        .then((res) => res?.data);
};

/** وضعیت ترنسکد ویدیو؛ برای نمایش مرحله‌ی «در حال پردازش» بعد از آپلود */
export const videoStatus = async <T extends ServerResponse<VideoStatusResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog/video-status/" + id)
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        url: string,
        status: number | string,
        categoryId: number | string,
        video: File | null,
        poster: File | null,
        description: string,
        setProgress?: (progress: number) => void // تابع برای تغییر مقدار درصد آپلود

    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('description', params.description);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    if (params.video)
        formData.append('video', params.video);
    formData.append('categoryId', params.categoryId.toString());
    if (params.poster)
        formData.append('poster', params.poster);
    return axios.post<T, SuccessResponseType<T>>("admin/vlog/store", formData,
        {
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (params.setProgress) params.setProgress(percentCompleted);
            }
        })
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        title: string,
        url: string,
        status: number | string,
        categoryId: number | string,
        video: File | null,
        poster: File | null,
        description: string ,
        setProgress?: (progress: number) => void // تابع برای تغییر مقدار درصد آپلود
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('description', params.description);
    formData.append('url', params.url);
    formData.append('categoryId', params.categoryId.toString());
    formData.append('status', params.status.toString());
    if (params.video)
        formData.append('video', params.video);
    if (params.poster)
        formData.append('poster', params.poster);
    return axios.post<T, SuccessResponseType<T>>("admin/vlog/update", formData,
        {
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (params.setProgress) params.setProgress(percentCompleted);
            }
        })
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<VlogResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog/find/" + id)
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
