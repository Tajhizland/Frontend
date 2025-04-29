import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SliderResponse} from "@/services/types/slider";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        url: string,
        type: string,
        status: number | string,
        image: File,
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('status', params.status.toString());
    formData.append('url', params.url);
    formData.append('type', params.type);
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
        type: string,
        status: number | string,
        image: File | undefined,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('type', params.type);
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
export const removeSlider = async <T extends ServerResponse<SliderResponse>>
(
    id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/slider/delete/" + id)
        .then((res) => res?.data)
};
export const getMobileSliders = async <T extends ServerResponse<SliderResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/slider/all_mobile")
        .then((res) => res?.data?.result)
};
export const getDesktopSliders = async <T extends ServerResponse<SliderResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/slider/all_desktop")
        .then((res) => res?.data?.result)
};

export const sortSlider = async <T extends ServerResponse<unknown>>
(
    param:{
        slider: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/slider/sort",param)
        .then((res) => res?.data)
};
