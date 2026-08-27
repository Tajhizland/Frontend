import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CastResponse} from "@/services/types/cast";
import {CastCategoryResponse} from "@/services/types/castCategory";
import {tableFetcher} from "@/shared/Table/fetcher";
import {CastCategoryStoreDto, CastCategoryUpdateDto} from "@/services/types/castCategory";
import {toFormData} from "@/services/http";

export const castCategoryTable = tableFetcher<CastCategoryResponse>("admin/cast-category/dataTable");


export const store = async <T extends ServerResponse<unknown>>
(dto: CastCategoryStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/cast-category", toFormData(dto))
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: CastCategoryUpdateDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/cast-category/" + id, toFormData(dto, "PUT"))
        .then((res) => res?.data)
};


export const get = async <T extends ServerResponse<CastCategoryResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/cast-category/get")
        .then((res) => res?.data?.result?.data)
};

export const findById = async <T extends ServerResponse<CastCategoryResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/cast-category/" + id)
        .then((res) => res?.data?.result?.data)
};