import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SamplePageResponse} from "@/services/types/sample";
import {LeadingResponse} from "@/services/types/leading";

export const findLeading = async <T extends ServerResponse<LeadingResponse>>
() => {
    return axios.get<T, SuccessResponseType<T>>("leading/index")
        .then((res) => res?.data.result.data)
};
