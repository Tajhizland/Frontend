import {SampleResponse} from "@/services/types/sample";
import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {SampleImageResponse} from "@/services/types/sampleImage";
import {SampleVideoResponse} from "@/services/types/sampleVideo";

export const find = async <T extends ServerResponse<SampleResponse>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/sample")
        .then((res) => res?.data?.result?.data)
};

export const set = async <T extends ServerResponse<unknown>>
(
    content:  string
) => {
    return axios.put<T, SuccessResponseType<T>>("admin/sample",{content:content})
        .then((res) => res?.data)
};
export const getImages = async <T extends ServerResponse<SampleImageResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/sample/image")
        .then((res) => res?.data?.result?.data)
};
export const uploadImage = async <T extends ServerResponse<unknown>>
(
    image:File
) => {
    const formData = new FormData();
    formData.append('image',image);
    return axios.post<T, SuccessResponseType<T>>("admin/sample/image",formData)
        .then((res) => res?.data)
};
export const deleteImage = async <T extends ServerResponse<unknown[]>>
(
    id:number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/sample/image/"+id)
        .then((res) => res?.data)
};


export const getVideo = async <T extends ServerResponse<SampleVideoResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/sample/video")
        .then((res) => res?.data?.result?.data)
};
export const setVideo = async <T extends ServerResponse<unknown>>
(
    vlog_id:number
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/sample/video", {vlog_id:vlog_id})
        .then((res) => res?.data)
};
export const deleteVideo = async <T extends ServerResponse<unknown[]>>
(
    id:number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/sample/video/"+id)
        .then((res) => res?.data)
};


export const sortSampleVideo = async <T extends ServerResponse<unknown>>
(
    param:{
        video: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/sample/video/sort",param)
        .then((res) => res?.data)
};

export const sortSampleImage = async <T extends ServerResponse<unknown>>
(
    param:{
        image: {
            id: number
            sort: number
        }[]
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/sample/image/sort",param)
        .then((res) => res?.data)
};
