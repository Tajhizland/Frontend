import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {tableFetcher} from "@/shared/Table/fetcher";
import {
    RandomProductCategoryResponse,
    RandomProductCategoryStoreDto
} from "@/services/types/randomProductCategory";

export const randomProductCategoryTable = tableFetcher<RandomProductCategoryResponse>("admin/random-product-category/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: RandomProductCategoryStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/random-product-category", dto)
        .then((res) => res?.data)
};

export const remove = async <T extends ServerResponse<unknown>>
(id: number) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/random-product-category/" + id)
        .then((res) => res?.data)
};
