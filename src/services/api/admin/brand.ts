import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BrandResponse} from "@/services/types/brand";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {BrandStoreDto, BrandUpdateDto} from "@/services/types/brand";
import {UploadProgress, toFormData} from "@/services/http";

export const brandTable = tableFetcher<BrandResponse>("admin/brand/dataTable");

export const brandList = async <T extends ServerResponse<BrandResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/brand/list")
        .then((res) => res?.data?.result)
};
export const store = async <T extends ServerResponse<unknown>>(dto: BrandStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/brand", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: BrandUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/brand/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<BrandResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/brand/" + id)
        .then((res) => res?.data?.result?.data)
};
export const sortBrands = async <T extends ServerResponse<unknown>>
(
    param:{
        brand: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/brand/sort",param)
        .then((res) => res?.data)
};
