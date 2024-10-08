import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {AddressResponse} from "@/services/types/address";


export const find = async <T extends ServerResponse<AddressResponse>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("address/find")
        .then((res) => res?.data.result.data)
};
export const update = async <T extends ServerResponse<unknown>>
(params:{
    city_id:string ,
    province_id:string ,
    tell:string ,
    mobile:string ,
    zip_code:string ,
    address:string ,
 }
) => {
    return axios.post<T, SuccessResponseType<T>>("address/update" , params)
        .then((res) => res?.data)
};
