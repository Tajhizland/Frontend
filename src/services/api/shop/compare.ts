import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";
import {CompareAllProductDto, CompareSearchDto} from "@/services/types/compare";

export const find = async <T extends ServerResponse<ProductResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("compare/" + id)
        .then((res) => res?.data?.result?.data)
};
export const search = async <T extends ServerResponse<ProductResponse[]>>
(dto: CompareSearchDto) => {
    return axios.post<T, SuccessResponseType<T>>("compare/search",dto)
        .then((res) => res?.data?.result?.data)
};
export const allProduct = async <T extends ServerResponse<ProductResponse[]>>
(dto: CompareAllProductDto) => {
    return axios.post<T, SuccessResponseType<T>>("compare/product",dto)
        .then((res) => res?.data?.result?.data)
};
