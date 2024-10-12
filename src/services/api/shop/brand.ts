import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BrandListingResponse} from "@/services/types/brand";

export const findBrandByUrl = async <T extends ServerResponse<BrandListingResponse>>
(
    url: string,
    filter?: string,
    page: number = 1
) => {

    return axios.post<T, SuccessResponseType<T>>("brand/find?"+ "page=" + page+"&"+  filter,  {url: url})
        .then((res) => res?.data?.result?.data)
};
