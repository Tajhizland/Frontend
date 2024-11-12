import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BannerResponse} from "@/services/types/banner";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        url: string,
        image: File | undefined,
    }
) => {
    const formData = new FormData();
    formData.append('url', params.url);
    if (params.image) {
        formData.append('image', params.image);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/banner/store", formData, {
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
        url: string,
        image: File | undefined,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('url', params.url);
    if (params.image) {
        formData.append('image', params.image);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/banner/update", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const deleteBanner = async <T extends ServerResponse<BannerResponse>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/banner/delete/" + id)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<BannerResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/banner/find/" + id)
        .then((res) => res?.data?.result?.data)
};
