import axios, {ServerResponse, SuccessResponseType} from "@/services/axios"; 
import {VlogCategoryResponse} from "@/services/types/vlogCategory";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {VlogCategoryStoreDto, VlogCategoryUpdateDto} from "@/services/types/vlogCategory";
import {UploadProgress, toFormData} from "@/services/http";

export const vlogCategoryTable = tableFetcher<VlogCategoryResponse>("admin/vlog-category/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: VlogCategoryStoreDto, onProgress?: UploadProgress) => {

    return axios.post<T, SuccessResponseType<T>>("admin/vlog-category", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: VlogCategoryUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog-category/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<VlogCategoryResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog-category/" + id)
        .then((res) => res?.data?.result?.data)
};

export const getList = async <T extends ServerResponse<VlogCategoryResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/vlog-category/list")
        .then((res) => res?.data?.result?.data)
};


export const sortVlogCategory = async <T extends ServerResponse<unknown>>
(
    param: {
        vlogs: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/vlog-category/sort",param)
        .then((res) => res?.data)
};
