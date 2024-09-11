import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { ColorResponse } from "@/services/types/color";

export const set = async <T extends ServerResponse<unknown>>(
    params: {
        product_id:string|number,
        color:{
            id:string,
            name:string,
            code:string,
            price:number|string,
            discount:number|string,
            stock:number|string,
            status:number|string,
            delivery_delay:number|string,
        }[]
    
    }
) => {
  
    return axios.post<T, SuccessResponseType<T>>("admin/product/color/set", params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<ColorResponse[]>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/color/get/"+id )
        .then((res) => res?.data?.result?.data)
};
