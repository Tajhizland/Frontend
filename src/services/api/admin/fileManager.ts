import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductImageResponse} from "@/services/types/productImage";
import {FileManagerResponse} from "@/services/types/fileManager";

export const getByProductId = async <T extends ServerResponse<FileManagerResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/file/get/" + id)
        .then((res) => res?.data?.result.data)
};

export const upload = async <T extends ServerResponse<unknown>>
(
    params: {
        product_id: number,
        file: File,
    }
) => {
    const formData = new FormData();
    formData.append('product_id', params.product_id + "");
    formData.append('file', params.file);
    return axios.post<T, SuccessResponseType<T>>("admin/product/file/set/", formData)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/product/file/delete/" + id)
        .then((res) => res?.data)
};
