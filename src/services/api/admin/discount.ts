import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DiscountResponse} from "@/services/types/discount";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        campaign_id: string,
        discounts: {
            discount: number,
            product_color_id: number
        }[]
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/discount/store", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        discount: number,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/discount/update", params)
        .then((res) => res?.data);
};
export const getDiscountList = async <T extends ServerResponse<DiscountResponse[]>>
(id: number) => {
    return axios.get<T, SuccessResponseType<T>>("admin/discount/get/" + id)
        .then((res) => res?.data?.result?.data)
};
export const removeById = async <T extends ServerResponse<unknown>>
(
    id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/discount/delete/" + id)
        .then((res) => res?.data)
};
