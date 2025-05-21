import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {GroupFieldResponse} from "@/services/types/groupField";
import {GroupProductResponse} from "@/services/types/groupProduct";

export const getField = async <T extends ServerResponse<GroupFieldResponse[]>>
(id: number) => {
    return axios.get<T, SuccessResponseType<T>>("admin/group/field/" + id)
        .then((res) => res?.data?.result?.data)
};

export const getProduct = async <T extends ServerResponse<GroupProductResponse[]>>
(id: number) => {
    return axios.get<T, SuccessResponseType<T>>("admin/group/product/" + id)
        .then((res) => res?.data?.result?.data)
};

export const deleteField = async <T extends ServerResponse<GroupProductResponse[]>>
(id: number) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/group/field/" + id)
        .then((res) => res?.data)
};

export const deleteProduct = async <T extends ServerResponse<GroupProductResponse[]>>
(id: number) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/group/product/" + id)
        .then((res) => res?.data?.result?.data)
};

export const addField = async <T extends ServerResponse<GroupProductResponse[]>>
(params: {
    groupId:number;
    title:string;
}) => {
    return axios.post<T, SuccessResponseType<T>>("admin/group/field",params)
        .then((res) => res?.data)
};

export const addProduct = async <T extends ServerResponse<GroupProductResponse[]>>
(params: {
    groupId:number;
    productId:number;
}) => {
    return axios.post<T, SuccessResponseType<T>>("admin/group/product",params)
        .then((res) => res?.data?.result?.data)
};
