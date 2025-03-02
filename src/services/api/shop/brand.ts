import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BrandListingResponse, BrandPageResponse, BrandResponse} from "@/services/types/brand";

export const findBrandByUrl = async <T extends ServerResponse<BrandListingResponse>>
(
    url: string,
    filter?: string,
    page: number = 1
) => {
    return axios.post<T, SuccessResponseType<T>>("brand/find?"+ "page=" + page+"&"+  filter,  {url: url})
        .then((res) => res?.data?.result?.data)
};

export const getBrandList = async <T extends ServerResponse<BrandPageResponse>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("brand/list")
        .then((res) => res?.data?.result?.data)
};
