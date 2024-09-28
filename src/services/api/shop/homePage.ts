import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {HomePageResponse} from "@/services/types/homePage";

export const homePage = async <T extends ServerResponse<HomePageResponse>>
() => {
    return axios.get<T, SuccessResponseType<T>>("homepage")
        .then((res) => res?.data?.result)
};
