import axios, {ServerResponse, SuccessResponseType} from "@/services/axios"; 
import { ContactResponse } from "@/services/types/contact";

export const storeContact = async <T extends ServerResponse<unknown>>
(
    params:{
        name:string;
        email:string;
        message:string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("contact",params )
        .then((res) => res?.data)
};
export const findById = async <T extends ServerResponse<ContactResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/contact/find/"+id )
        .then((res) => res?.data?.result?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(
    id:number|string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/contact/delete/"+id  )
        .then((res) => res?.data)
};