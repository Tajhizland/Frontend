import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OptionResponse} from "@/services/types/option";
import {OptionItemsResponse} from "@/services/types/optionItem";
import {tableFetcher} from "@/shared/Table/fetcher";
import {OptionSetDto, OptionSetToCategoryDto, OptionStoreDto, OptionUpdateDto} from "@/services/types/option";

export const optionTable = tableFetcher<OptionResponse>("admin/option/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: OptionStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/option", dto)
        .then((res) => res?.data)
};
export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: OptionUpdateDto) => {
    return axios.put<T, SuccessResponseType<T>>("admin/option/" + id, dto)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<OptionResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/option/" + id)
        .then((res) => res?.data?.result?.data)
};


export const set = async <T extends ServerResponse<unknown>>(dto: OptionSetDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/product/option", dto)
        .then((res) => res?.data);
};

export const findByProductId = async <T extends ServerResponse<OptionItemsResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/" + id + "/option")
        .then((res) => res?.data?.result?.data)
};
export const findByCategoryId = async <T extends ServerResponse<OptionItemsResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/" + id + "/option")
        .then((res) => res?.data?.result?.data)
};
export const setToCategory = async <T extends ServerResponse<unknown>>
(dto: OptionSetToCategoryDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/option", dto)
        .then((res) => res?.data)
};
export const sortOption = async <T extends ServerResponse<unknown>>
(
    param: {
        option: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/option/sort", param)
        .then((res) => res?.data)
};
export const getOptionItemByOption = async <T extends ServerResponse<OptionItemsResponse[]>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/option-item/" + id)
        .then((res) => res?.data?.result?.data)
};
export const sortOptionItem = async <T extends ServerResponse<unknown>>
(
    param: {
        optionItem: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/option-item/sort", param)
        .then((res) => res?.data)
};
export const updateOption = async <T extends ServerResponse<unknown>>
(
    param: {
        optionItem: {
            id: number;
            categoryId: number;
            title: string;
            status: number;
        }
    }
) => {
    return axios.put<T, SuccessResponseType<T>>("admin/category/option", param)
        .then((res) => res?.data)
};

export const updateProductOption = async <T extends ServerResponse<unknown>>
(
    param: {
        options: {
            id: number;
            productId: number;
            value: string;
            option_item_id: number;
        }[]
    }
) => {
    return axios.put<T, SuccessResponseType<T>>("admin/product/option", param)
        .then((res) => res?.data)
};
