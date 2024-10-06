import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {MenuResponse} from "@/services/types/menu";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        parent_id: string,
        url: string|null,
        status: string,
        banner_title: string | null,
        banner_logo: File | null,
        banner_link: string | null
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('parent_id', params.parent_id +"");
    formData.append('url', params.url??"");
    formData.append('status', params.status);
    formData.append('banner_title', params.banner_title??"");
    formData.append('banner_link', params.banner_link??"");
    if (params.banner_logo) {
        formData.append('banner_logo', params.banner_logo);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/menu/store", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const fastUpdate = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        title: string,
        parent_id: number,
        url: string|null,
        status: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/menu/update", params)
        .then((res) => res?.data);
};


export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        title: string,
        parent_id: string,
        url: string|null,
        status: string,
        banner_title: string | null,
        banner_logo: File | null,
        banner_link: string | null
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('parent_id', params.parent_id +"");
    formData.append('url', params.url??"");
    formData.append('status', params.status+"");
    formData.append('banner_title', params.banner_title??"");
    formData.append('banner_link', params.banner_link??"");
    if (params.banner_logo) {
        formData.append('banner_logo', params.banner_logo);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/menu/update", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<MenuResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/menu/find/" + id)
        .then((res) => res?.data?.result?.data)
};
