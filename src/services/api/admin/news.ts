import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {NewsResponse} from "@/services/types/news";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {NewsStoreDto, NewsUpdateDto} from "@/services/types/news";
import {UploadProgress, toFormData} from "@/services/http";

export const newsTable = tableFetcher<NewsResponse>("admin/news/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: NewsStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/news", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: NewsUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/news/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<NewsResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/news/"+id )
        .then((res) => res?.data?.result?.data)
};
