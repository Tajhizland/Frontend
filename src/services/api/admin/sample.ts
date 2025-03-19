import {SampleResponse} from "@/services/types/sample";
import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SampleImageResponse} from "@/services/types/sampleImage";
import {SampleVideoResponse} from "@/services/types/sampleVideo";

export const find = async <T extends ServerResponse<SampleResponse>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/sample/find")
        .then((res) => res?.data?.result?.data)
};

export const set = async <T extends ServerResponse<unknown>>
(
    content:  string
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/sample/update",{content:content})
        .then((res) => res?.data)
};
export const getImages = async <T extends ServerResponse<SampleImageResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/sample/image/get")
        .then((res) => res?.data?.result?.data)
};
export const uploadImage = async <T extends ServerResponse<unknown>>
(
    image:File
) => {
    const formData = new FormData();
    formData.append('image',image);
    return axios.post<T, SuccessResponseType<T>>("admin/sample/image/upload",formData)
        .then((res) => res?.data)
};
export const deleteImage = async <T extends ServerResponse<unknown[]>>
(
    id:number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/sample/image/delete/"+id)
        .then((res) => res?.data)
};


export const getVideo = async <T extends ServerResponse<SampleVideoResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/sample/video/get")
        .then((res) => res?.data?.result?.data)
};
export const setVideo = async <T extends ServerResponse<unknown>>
(
    vlog_id:number
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/sample/video/add", {vlog_id:vlog_id})
        .then((res) => res?.data)
};
export const deleteVideo = async <T extends ServerResponse<unknown[]>>
(
    id:number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/sample/video/delete/"+id)
        .then((res) => res?.data)
};

