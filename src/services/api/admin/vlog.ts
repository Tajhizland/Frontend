import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {VlogResponse} from "@/services/types/vlog";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        url: string,
        status: number | string,
        categoryId: number | string,
        video: File,
        poster: File,
        description: string,
        setProgress?: (progress: number) => void // تابع برای تغییر مقدار درصد آپلود

    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('description', params.description);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    formData.append('video', params.video);
    formData.append('categoryId', params.categoryId.toString());
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
