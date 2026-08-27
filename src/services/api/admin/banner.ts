import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BannerResponse} from "@/services/types/banner";
import {SliderResponse} from "@/services/types/slider";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {BannerStoreDto, BannerUpdateDto} from "@/services/types/banner";
import {UploadProgress, toFormData} from "@/services/http";

export const bannerTable = tableFetcher<SliderResponse>("admin/banner/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: BannerStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/banner", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: BannerUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/banner/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const deleteBanner = async <T extends ServerResponse<BannerResponse>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/banner/" + id)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<BannerResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/banner/" + id)
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
