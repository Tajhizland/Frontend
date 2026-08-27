import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {GroupFieldResponse} from "@/services/types/groupField";
import {GroupProductResponse} from "@/services/types/groupProduct";
import {GroupFieldValuePage} from "@/services/types/groupFieldValue";
import {ProductResponse} from "@/services/types/product";
import {tableFetcher} from "@/shared/Table/fetcher";
import {ProductGroupAddFieldDto, ProductGroupAddProductDto, ProductGroupSetFieldValueDto} from "@/services/types/productGroup";

export const groupTable = tableFetcher<ProductResponse>("admin/group/dataTable");

export const getField = async <T extends ServerResponse<GroupFieldResponse[]>>
(id: number) => {
    return axios.get<T, SuccessResponseType<T>>("admin/group/" + id + "/field")
        .then((res) => res?.data?.result?.data)
};

export const getProduct = async <T extends ServerResponse<GroupProductResponse[]>>
(id: number) => {
    return axios.get<T, SuccessResponseType<T>>("admin/group/" + id + "/product")
        .then((res) => res?.data?.result?.data)
};
export const getFieldValue = async <T extends ServerResponse<GroupFieldValuePage>>
(id: number) => {
    return axios.get<T, SuccessResponseType<T>>("admin/group/" + id + "/field-value")
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
        .then((res) => res?.data)
};

export const addField = async <T extends ServerResponse<unknown>>
(dto: ProductGroupAddFieldDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/group/field",dto)
        .then((res) => res?.data)
};

export const addProduct = async <T extends ServerResponse<unknown>>
(dto: ProductGroupAddProductDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/group/product",dto)
        .then((res) => res?.data)
};
export const setFieldValue = async <T extends ServerResponse<unknown>>
(dto: ProductGroupSetFieldValueDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/group/field-value",dto)
        .then((res) => res?.data)
};
