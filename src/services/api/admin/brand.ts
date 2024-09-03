import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BrandResponse} from "@/services/types/brand";

export const brandList = async <T extends ServerResponse<BrandResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/brand/list")
        .then((res) => res?.data?.result)
};

