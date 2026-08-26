import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
 import {SamplePageResponse } from "@/services/types/sample";

export const findSample = async <T extends ServerResponse<SamplePageResponse>>
() => {
    return axios.get<T, SuccessResponseType<T>>("sample")
        .then((res) => res?.data.result.data)
};
