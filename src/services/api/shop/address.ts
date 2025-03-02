import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {AddressResponse} from "@/services/types/address";


export const findActive = async <T extends ServerResponse<AddressResponse>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("address/findActive")
        .then((res) => res?.data.result.data)
};
export const getAllAddress = async <T extends ServerResponse<AddressResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("address/all")
        .then((res) => res?.data.result.data)
};
export const update = async <T extends ServerResponse<unknown>>
(params:{
    id?:number ,
    city_id:string ,
    title:string ,
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
export const changeActiveAddress = async <T extends ServerResponse<unknown>>
(params:{
    id:number ,
 }
) => {
    return axios.post<T, SuccessResponseType<T>>("address/active/change" , params)
        .then((res) => res?.data)
};
