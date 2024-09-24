import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        product_id: string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/special_product/add", params)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/special_product/delete/"+id)
        .then((res) => res?.data)
};
