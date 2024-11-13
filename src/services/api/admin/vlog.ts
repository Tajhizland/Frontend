import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {VlogResponse} from "@/services/types/vlog";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        url: string,
        status: number | string,
        video: File,
        description: string
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('description', params.title);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    formData.append('video', params.video);
    return axios.post<T, SuccessResponseType<T>>("admin/vlog/store", formData)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        title: string,
        url: string,
        status: number | string,
        video: File | null,
        description: string
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('description', params.title);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    if (params.video)
        formData.append('video', params.video);
    return axios.post<T, SuccessResponseType<T>>("admin/vlog/update", formData)
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<VlogResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog/find/" + id)
        .then((res) => res?.data?.result?.data)
};
