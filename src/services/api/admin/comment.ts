import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CommentResponse} from "@/services/types/comment";

export const findById = async <T extends ServerResponse<CommentResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/comment/find/"+id )
        .then((res) => res?.data?.result?.data)
};
export const accept = async <T extends ServerResponse<unknown>>
(
    id:number|string
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/comment/accept",{id:id} )
        .then((res) => res?.data)
};
export const reject = async <T extends ServerResponse<unknown>>
(
    id:number|string
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/comment/reject",{id:id} )
        .then((res) => res?.data)
};
