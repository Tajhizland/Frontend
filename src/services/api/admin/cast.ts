import axios, { ServerResponse, SuccessResponseType } from "@/services/axios";
import { CastResponse } from "@/services/types/cast";


export const store = async <T extends ServerResponse<unknown>>
    (
        params: {
            title: string,
            url: string,
            audio: File,
            image: File,
            vlog_id: number,
            category_id: number,
            status: number,
            description: string,
            setProgress?: (progress: number) => void

        }
    ) => {

    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('url', params.url);
    formData.append('description', params.description);
    formData.append('status', params.status.toString());
    formData.append('vlog_id', params.vlog_id.toString());
    formData.append('category_id', params.category_id.toString());
    formData.append('status', params.status.toString());
    formData.append('audio', params.audio);
    formData.append('image', params.image);


    return axios.post<T, SuccessResponseType<T>>("admin/cast/store", formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (params.setProgress) params.setProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
    (
        params: {
            id: number | string,
            title: string,
            url: string,
            audio?: File,
            image?: File,
            vlog_id: number,
            category_id: number,
            status: number,
            description: string,
            setProgress?: (progress: number) => void
        }
    ) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('url', params.url);
    formData.append('description', params.description);
    formData.append('status', params.status.toString());
    formData.append('vlog_id', params.vlog_id.toString());
    formData.append('category_id', params.category_id.toString());
    formData.append('status', params.status.toString());

    if (params.image) {
        formData.append('image', params.image);
    }
    if (params.audio) {
        formData.append('audio', params.audio);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/cast/update", formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }, onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (params.setProgress) params.setProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CastResponse>>
    (
        id: number
    ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/cast/find/" + id)
        .then((res) => res?.data?.result?.data)
};