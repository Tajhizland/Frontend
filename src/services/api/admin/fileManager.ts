import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductImageResponse} from "@/services/types/productImage";
import {FileManagerResponse} from "@/services/types/fileManager";

export const getFiles = async <T extends ServerResponse<FileManagerResponse[]>>
(
    params: {
        model_id: number,
        model_type: string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/file/get/", params)
        .then((res) => res?.data?.result.data)
};

export const upload = async <T extends ServerResponse<unknown>>
(
    params: {
        model_id: number,
        model_type: string,
        file: File,
    }
) => {
    const formData = new FormData();
    formData.append('model_id', params.model_id + "");
    formData.append('model_type', params.model_type);
    formData.append('file', params.file);
    return axios.post<T, SuccessResponseType<T>>("admin/file/upload", formData)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/file/remove/" + id)
        .then((res) => res?.data)
};
