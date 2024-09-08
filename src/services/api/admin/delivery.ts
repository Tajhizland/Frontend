import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DeliveryResponse} from "@/services/types/delivery";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name:string,
        status:number|string,
        description:string,
        logo:string,
        price:string|number,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/delivery/store" , params)
        .then((res) => res?.data)
};
export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number,
        name:string,
        status:number|string,
        description:string,
        logo:string,
        price:string|number,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/delivery/update" , params)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<DeliveryResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/delivery/find/"+id )
        .then((res) => res?.data?.result?.data)
};
