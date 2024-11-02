import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {GuarantyResponse  } from "@/services/types/guaranty";

export const guarantyLists = async <T extends ServerResponse<GuarantyResponse[]>>
( ) => {

    return axios.get<T, SuccessResponseType<T>>("admin/guaranty/list")
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name:string,
        status:number|string,
        icon:File|undefined,
        description:string,
    }
) => {
    const formData = new FormData();
    formData.append('name', params.name);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);
    if (params.icon) {
        formData.append('icon', params.icon);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/guaranty/store" , formData)
        .then((res) => res?.data)
};
export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id:number,
        name:string,
        status:number|string,
        icon?:File|undefined,
        description:string,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id +"");
    formData.append('name', params.name);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);
    if (params.icon) {
        formData.append('icon', params.icon);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/guaranty/update" , formData)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<GuarantyResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/guaranty/find/"+id )
        .then((res) => res?.data?.result?.data)
};
