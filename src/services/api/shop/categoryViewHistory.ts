import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";
import {CategoryViewHistoryStoreCategoryViewHistoryDto, CategoryViewHistoryStoreCategoryViewHistoryIpDto} from "@/services/types/categoryViewHistory";

export const storeCategoryViewHistory = async <T extends ServerResponse<unknown>>
(dto: CategoryViewHistoryStoreCategoryViewHistoryDto) => {

    return axios.post<T, SuccessResponseType<T>>("category-view-history", dto)
        .then((res) => res?.data)
};

export const storeCategoryViewHistoryIp = async <T extends ServerResponse<unknown>>
(dto: CategoryViewHistoryStoreCategoryViewHistoryIpDto) => {

    return axios.post<T, SuccessResponseType<T>>("category-view-history/ip", dto)
        .then((res) => res?.data)
};

export const suggestProduct = async <T extends ServerResponse<ProductResponse[]>>
(
) => {

    return axios.get<T, SuccessResponseType<T>>("category-view-history/suggest")
        .then((res) => res?.data?.result?.data)
};

export const suggestIpProduct = async <T extends ServerResponse<ProductResponse[]>>
(
) => {

    return axios.get<T, SuccessResponseType<T>>("category-view-history/suggest/ip")
        .then((res) => res?.data?.result?.data)
};
