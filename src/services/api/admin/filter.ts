import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { FilterResponse } from "@/services/types/filter";
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
