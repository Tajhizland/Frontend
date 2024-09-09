import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {NewsResponse} from "@/services/types/news";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title:string,
        url:string,
        published:number|string,
        image: File | null,
        content:string
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
    formData.append('url', params.url);
    formData.append('published', params.published.toString());
    formData.append('content', params.content);

    if (params.image) {
        formData.append('image', params.image);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/news/store", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number|string,
        title:string,
        url:string,
        published:number|string,
        image: File | null,
        content:string
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('url', params.url);
    formData.append('published', params.published.toString());
    formData.append('content', params.content);

    if (params.image) {
        formData.append('image', params.image);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/news/update", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<NewsResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/news/find/"+id )
        .then((res) => res?.data?.result?.data)
};
