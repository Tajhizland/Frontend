import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CastCategoryResponse} from "@/services/types/castCategory";


export const getCastCategory = async <T extends ServerResponse<CastCategoryResponse[]>>
(  ) => {
    return axios.post<T, SuccessResponseType<T>>("cast-category")
        .then((res) => res?.data?.result?.data)
};