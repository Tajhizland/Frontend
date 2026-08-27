import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {PageResponse} from "@/services/types/page";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {PageStoreDto, PageUpdateDto} from "@/services/types/page";
import {UploadProgress, toFormData} from "@/services/http";

export const pageTable = tableFetcher<PageResponse>("admin/page/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: PageStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/page", toFormData(dto), uploadConfig(onProgress) )
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: PageUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/page/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress) )
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<PageResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/page/"+id )
        .then((res) => res?.data?.result?.data)
};
