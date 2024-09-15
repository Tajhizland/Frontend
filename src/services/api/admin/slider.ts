import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SliderResponse} from "@/services/types/slider";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        url: string,
        status: number | string,
        image: File,
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('status', params.status.toString());
    formData.append('url', params.url);
    if (params.image) {
        formData.append('image', params.image);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/slider/store", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        title: string,
        url: string,
        status: number | string,
        image: File | undefined,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('status', params.status.toString());
    formData.append('url', params.url);
    if (params.image) {
        formData.append('image', params.image);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/slider/update", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<SliderResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/slider/find/" + id)
        .then((res) => res?.data?.result?.data)
};
