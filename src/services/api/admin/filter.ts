import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { FilterResponse } from "@/services/types/filter";

export const set = async <T extends ServerResponse<unknown>>(
    params: {
        product_id:string|number,
        filter:{
            id:string,
            item_id:string,
           
        }[]
    
    }
) => {
  
    return axios.post<T, SuccessResponseType<T>>("admin/product/filter/set", params)
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<FilterResponse[]>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/filter/get/"+id )
        .then((res) => res?.data?.result?.data)
};