import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UserResponse} from "@/services/types/user";



export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number ;
        name:string ;
        username:string ;
        email:string ;
        gender:string ;
        role:string ;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/user/update" , params)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<UserResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/user/find/"+id )
        .then((res) => res?.data?.result?.data)
};
