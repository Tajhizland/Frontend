import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CategoryResponse} from "@/services/types/category";
import {ProductResponse} from "@/services/types/product";
import {tableFetcher} from "@/shared/Table/fetcher";
import {CategorySearchDto, CategoryStoreDto, CategoryUpdateDto} from "@/services/types/category";
import {toFormData} from "@/services/http";

export const categoryTable = tableFetcher<CategoryResponse>("admin/category/dataTable");

export const categoryList = async <T extends ServerResponse<CategoryResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/list")
        .then((res) => res?.data?.result)
};


export const store = async <T extends ServerResponse<unknown>>
(dto: CategoryStoreDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/category", toFormData(dto),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: CategoryUpdateDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/" + id, toFormData(dto, "PUT"),
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CategoryResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/" + id)
        .then((res) => res?.data?.result?.data)
};
export const search = async <T extends ServerResponse<CategoryResponse[]>>
(dto: CategorySearchDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/search/category", dto)
        .then((res) => res?.data?.result?.data)
};


export const productOfCategory = async <T extends ServerResponse<ProductResponse[]>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/" + id + "/product")
        .then((res) => res?.data?.result.data)
};
export const sort = async <T extends ServerResponse<unknown>>
(param: {
     product: {
         id: number
         sort: number
     }[]
 }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/sort", param)
        .then((res) => res?.data)
};

export const deleteImage = async <T extends ServerResponse<unknown>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/category/" + id + "/image")
        .then((res) => res?.data)
};
