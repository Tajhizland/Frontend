import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OrderResponse} from "@/services/types/order";

export const myOrders = async <T extends ServerResponse<OrderResponse[]>>
( 
    page:number=1
) => {
    return axios.get<T, SuccessResponseType<T>>("my-orders?page="+page )
        .then((res) => res?.data?.result)
};