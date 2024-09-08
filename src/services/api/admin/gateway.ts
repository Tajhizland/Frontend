import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {GatewayResponse} from "@/services/types/gateway";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name:string,
        status:number|string,
        description:string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/gateway/store" , params)
        .then((res) => res?.data)
};
export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number,
        name:string,
        status:number|string,
        description:string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/gateway/update" , params)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<GatewayResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/gateway/find/"+id )
        .then((res) => res?.data?.result?.data)
};
