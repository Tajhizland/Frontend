import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SearchResponse} from "@/services/types/serach";

export const search = async <T extends ServerResponse<SearchResponse>>
(
    params:{
        query:string
    }
) => {
    return axios.get<T, SuccessResponseType<T>>("search" ,{params})
        .then((res) => res?.data?.result.data)
};
