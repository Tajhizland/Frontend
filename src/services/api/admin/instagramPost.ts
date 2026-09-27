import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {
    InstagramPostAddMediaDto,
    InstagramPostMediaResponse,
    InstagramPostResponse,
    InstagramPostStoreDto,
    InstagramPostUpdateDto,
} from "@/services/types/instagramPost";
import {tableFetcher} from "@/shared/Table/fetcher";
import {toFormData, UploadProgress} from "@/services/http";

export const instagramPostTable = tableFetcher<InstagramPostResponse>("admin/instagram-post/dataTable");

/** آپلود چند فایل با گزارش درصد پیشرفت، چون ویدیوها ممکن است بزرگ باشند */
const withProgress = (onProgress?: UploadProgress) => ({
    onUploadProgress: (progressEvent: { loaded: number; total?: number }) => {
        if (!onProgress || !progressEvent.total) return;
        onProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
    },
});

export const store = async <T extends ServerResponse<InstagramPostResponse>>
(dto: InstagramPostStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/instagram-post", toFormData(dto), withProgress(onProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: InstagramPostUpdateDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/instagram-post/" + id, toFormData(dto, "PUT"))
        .then((res) => res?.data);
};

export const destroy = async <T extends ServerResponse<unknown>>
(id: number) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/instagram-post/" + id)
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<InstagramPostResponse>>
(id: number | string) => {
    return axios.get<T, SuccessResponseType<T>>("admin/instagram-post/" + id)
        .then((res) => res?.data?.result?.data);
};

export const getList = async <T extends ServerResponse<InstagramPostResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/instagram-post/list")
        .then((res) => res?.data?.result?.data);
};

export const sortPost = async <T extends ServerResponse<unknown>>
(param: { post: { id: number; sort: number }[] }) => {
    return axios.post<T, SuccessResponseType<T>>("admin/instagram-post/sort", param)
        .then((res) => res?.data);
};

export const getMedia = async <T extends ServerResponse<InstagramPostMediaResponse[]>>
(id: number | string) => {
    return axios.get<T, SuccessResponseType<T>>("admin/instagram-post/" + id + "/media")
        .then((res) => res?.data?.result?.data);
};

export const addMedia = async <T extends ServerResponse<unknown>>
(dto: InstagramPostAddMediaDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/instagram-post/media", toFormData(dto), withProgress(onProgress))
        .then((res) => res?.data);
};

export const removeMedia = async <T extends ServerResponse<unknown>>
(id: number) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/instagram-post/media/" + id)
        .then((res) => res?.data);
};

export const sortMedia = async <T extends ServerResponse<unknown>>
(param: { media: { id: number; sort: number }[] }) => {
    return axios.post<T, SuccessResponseType<T>>("admin/instagram-post/media/sort", param)
        .then((res) => res?.data);
};
