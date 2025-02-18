import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PageResponse} from "@/services/types/page";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title:string,
        url:string,
        status:number|string,
        image: File | null,
        content:string
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    formData.append('content', params.content);

    if (params.image) {
        formData.append('image', params.image);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/page/store", formData )
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number|string,
        title:string,
        url:string,
        status:number|string,
        image: File | null,
        content:string
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('url', params.url);
    formData.append('status', params.status.toString());
    formData.append('content', params.content);

    if (params.image) {
        formData.append('image', params.image);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/page/update", formData )
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<PageResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/page/find/"+id )
        .then((res) => res?.data?.result?.data)
};
