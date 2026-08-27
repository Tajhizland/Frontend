import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {TrustedBrandResponse} from "@/services/types/trustedBrand";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {TrustedBrandStoreDto, TrustedBrandUpdateDto} from "@/services/types/trustedBrand";
import {UploadProgress, toFormData} from "@/services/http";

export const trustedBrandTable = tableFetcher<TrustedBrandResponse>("admin/trusted-brand/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: TrustedBrandStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/trusted-brand", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: TrustedBrandUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/trusted-brand/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};


export const findById = async <T extends ServerResponse<TrustedBrandResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/trusted-brand/" + id)
        .then((res) => res?.data?.result?.data)
};

export const deleteTrustedBrand = async <T extends ServerResponse<TrustedBrandResponse>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/trusted-brand/" + id)
        .then((res) => res?.data)
};
