import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { FilterResponse } from "@/services/types/filter";
import { FilterItemResponse } from "@/services/types/filterItem";
import {FilterSetDto, FilterSetToCategoryDto} from "@/services/types/filter";

export const set = async <T extends ServerResponse<unknown>>(dto: FilterSetDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/product/filter", dto)
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<FilterResponse[]>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/"+id+"/filter" )
        .then((res) => res?.data?.result?.data)
};
export const findByCategoryId = async <T extends ServerResponse<FilterResponse[]>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/"+id+"/filter" )
        .then((res) => res?.data?.result?.data)
};

export const setToCategory = async <T extends ServerResponse<unknown>>
    (dto: FilterSetToCategoryDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/filter", dto)
        .then((res) => res?.data)
};

export const sortFilter = async <T extends ServerResponse<unknown>>
(
    param: {
        filter: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/filter/sort", param)
        .then((res) => res?.data)
};

export const getFilterItemByFilter = async <T extends ServerResponse<FilterItemResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/filter-item/" + id)
        .then((res) => res?.data?.result?.data)
};

export const sortFilterItem = async <T extends ServerResponse<unknown>>
(
    param: {
        filterItem: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/filter-item/sort", param)
        .then((res) => res?.data)
};
