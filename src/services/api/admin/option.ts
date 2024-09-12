import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {OptionResponse} from "@/services/types/option";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title:string,
        status:number|string,
        category_id:number|string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/option/store" , params)
        .then((res) => res?.data)
};
export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number,
        title:string,
        status:number|string,
        category_id:number|string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/option/update" , params)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<OptionResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/option/find/"+id )
        .then((res) => res?.data?.result?.data)
};


export const set = async <T extends ServerResponse<unknown>>(
    params: {
        product_id:string|number,
        option:{
            value:string,
            item_id:string,
           
        }[]
    
    }
) => {
  
    return axios.post<T, SuccessResponseType<T>>("admin/product/option/set", params)
        .then((res) => res?.data);
};

export const findByProductId = async <T extends ServerResponse<OptionResponse[]>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/option/get/"+id )
        .then((res) => res?.data?.result?.data)
};
