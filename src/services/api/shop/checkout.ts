import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DeliveryResponse} from "@/services/types/delivery";

export const getDelivery = async <T extends ServerResponse<DeliveryResponse[]>>
(
) => {

    return axios.get<T, SuccessResponseType<T>>("delivery" )
        .then((res) => res?.data?.result?.data)
};
