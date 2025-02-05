import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BannerResponse} from "@/services/types/banner";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        url: string,
        type: string,
        image: File | undefined,
    }
) => {
    const formData = new FormData();
    formData.append('url', params.url);
    formData.append('type', params.type);
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
        type: string,
        image: File | undefined,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('url', params.url);
    formData.append('type', params.type);
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

export const getBannerList = async <T extends ServerResponse<BannerResponse[]>>
( ) => {
    return axios.get<T, SuccessResponseType<T>>("admin/banner/list")
        .then((res) => res?.data?.result)
};
export const sortBanner = async <T extends ServerResponse<unknown>>
(
    param:{
        banner: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/banner/sort",param)
        .then((res) => res?.data)
};
