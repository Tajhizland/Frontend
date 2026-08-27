import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";
import {SpecialProductResponse} from "@/services/types/specialProduct";
import {tableFetcher} from "@/shared/Table/fetcher";
import {SpecialProductStoreDto, SpecialProductUpdateHomepageDto} from "@/services/types/specialProduct";

export const specialProductTable = tableFetcher<SpecialProductResponse>("admin/special-product/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: SpecialProductStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/special-product", dto)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/special-product/"+id)
        .then((res) => res?.data)
};

export const updateHomepage = async <T extends ServerResponse<unknown>>
(id: number, dto: SpecialProductUpdateHomepageDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/special-product/" + id + "/homepage", {homepage: dto.homepage})
        .then((res) => res?.data)
};

export const list = async <T extends ServerResponse<ProductResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/special-product/list")
        .then((res) => res?.data?.result)
};

export const sort = async <T extends ServerResponse<ProductResponse[]>>
(
    param:{
        special: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/special-product/sort",param)
        .then((res) => res?.data)
};
