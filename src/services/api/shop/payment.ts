import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";

export const paymentRequest = async <T extends ServerResponse<unknown>>
( ) => {
    return axios.post<T, SuccessResponseType<T>>("payment/request" )
        .then((res) => res)
};
