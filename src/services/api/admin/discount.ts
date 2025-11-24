import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DiscountResponse} from "@/services/types/discount";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        title: string,
        status: number,
        start_date: string,
        end_date: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/discount/store", params)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        title: string,
        status: number,
        start_date: string,
        end_date: string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/discount/update", params)
        .then((res) => res?.data);
};

export const find = async <T extends ServerResponse<DiscountResponse>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/discount/find/" + id)
        .then((res) => res?.data?.result?.data)
};
