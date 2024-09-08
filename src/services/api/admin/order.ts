import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OrderResponse} from "@/services/types/order";

export const findById = async <T extends ServerResponse<OrderResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/order/find/"+id )
        .then((res) => res?.data?.result?.data)
};
