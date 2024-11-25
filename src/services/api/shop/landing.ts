import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {LandingResponse} from "@/services/types/landing";

export const findLandingByUrl = async <T extends ServerResponse<LandingResponse>>
(url: string
) => {
    return axios.post<T, SuccessResponseType<T>>("landing/find/" ,{url:url})
        .then((res) => res?.data?.result?.data)
};
