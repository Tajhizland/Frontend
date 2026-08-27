import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {FileManagerResponse} from "@/services/types/fileManager";
import {FileManagerGetFilesDto, FileManagerUploadDto} from "@/services/types/fileManager";
import {UploadProgress, toFormData} from "@/services/http";

export const getFiles = async <T extends ServerResponse<FileManagerResponse[]>>
(dto: FileManagerGetFilesDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/file/search", dto)
        .then((res) => res?.data?.result.data)
};

export const upload = async <T extends ServerResponse<unknown>>
(dto: FileManagerUploadDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/file", toFormData(dto),
        {
            onUploadProgress: (progressEvent) => {
                //@ts-ignore
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                if (onProgress) onProgress(percentCompleted);
            }
        })
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/file/" + id)
        .then((res) => res?.data)
};
