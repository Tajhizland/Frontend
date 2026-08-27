import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {LandingResponse} from "@/services/types/landing";
import {LandingCategoryResponse} from "@/services/types/landingCategory";
import {tableFetcher} from "@/shared/Table/fetcher";

export const landingTable = tableFetcher<LandingResponse>("admin/landing/dataTable");
import {LandingProductResponse} from "@/services/types/landingProduct";
import {LandingBannerResponse} from "@/services/types/landingBanner";
import {LandingSetCategoryLandingDto, LandingSetLandingBannerDto, LandingSetProductLandingDto, LandingStoreLandingDto, LandingUpdateLandingDto} from "@/services/types/landing";
import {toFormData} from "@/services/http";

export const storeLanding = async <T extends ServerResponse<unknown>>
(dto: LandingStoreLandingDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/landing", dto)
        .then((res) => res?.data)
};

export const updateLanding = async <T extends ServerResponse<unknown>>
(id: number, dto: LandingUpdateLandingDto) => {
    return axios.put<T, SuccessResponseType<T>>("admin/landing/" + id, dto)
        .then((res) => res?.data)
};

export const findLandingById = async <T extends ServerResponse<LandingResponse>>
(id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/landing/" + id)
        .then((res) => res?.data?.result?.data)
};

export const setProductLanding = async <T extends ServerResponse<unknown>>
(dto: LandingSetProductLandingDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/landing/product", dto)
        .then((res) => res?.data)
};

export const setCategoryLanding = async <T extends ServerResponse<unknown>>
(dto: LandingSetCategoryLandingDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/landing/category", dto)
        .then((res) => res?.data)
};

export const getLandingProducts = async <T extends ServerResponse<LandingProductResponse[]>>
(id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/landing/" + id + "/product")
        .then((res) => res?.data?.result?.data)
};

export const getLandingCategory = async <T extends ServerResponse<LandingCategoryResponse[]>>
(id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/landing/" + id + "/category")
        .then((res) => res?.data?.result?.data)
};
export const deleteLandingProducts = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/landing/product/" + id)
        .then((res) => res?.data)
};

export const deleteLandingCategory = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/landing/category/" + id)
        .then((res) => res?.data)
};

export const deleteLandingBanner = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/landing/banner/" + id)
        .then((res) => res?.data)
};

export const getLandingBanner = async <T extends ServerResponse<LandingBannerResponse[]>>
(id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/landing/" + id + "/banner")
        .then((res) => res?.data?.result?.data)
};
export const setLandingBanner = async <T extends ServerResponse<unknown>>
(dto: LandingSetLandingBannerDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/landing/banner" ,toFormData(dto))
        .then((res) => res?.data)
};
