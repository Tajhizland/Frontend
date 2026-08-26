import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CategoryResponse} from "@/services/types/category";
import {ProductResponse} from "@/services/types/product";
import {tableFetcher} from "@/shared/Table/fetcher";

export const categoryTable = tableFetcher<CategoryResponse>("admin/category/dataTable");

export const categoryList = async <T extends ServerResponse<CategoryResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/list")
        .then((res) => res?.data?.result)
};


export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        name: string,
        url: string,
        image: File | null,
        parent_id: number | string,
        status: number | string,
        description: string,
        type: string
    }
) => {

    const formData = new FormData();
    formData.append('name', params.name.toString());
    formData.append('url', params.url);
    formData.append('parent_id', params.parent_id.toString());
    formData.append('status', params.status.toString());
    formData.append('description', params.description);
    formData.append('type', params.type);

    if (params.image) {
        formData.append('image', params.image);
    }


    return axios.post<T, SuccessResponseType<T>>("admin/category", formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        name: string,
        url: string,
        image: File | null,
        parent_id: number | string,
        status: number | string,
        description: string,
        type: string
    }
) => {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', params.name);
    formData.append('url', params.url);
    formData.append('type', params.type);
    formData.append('parent_id', params.parent_id.toString());
    formData.append('status', params.status.toString());
    formData.append('description', params.description);

    if (params.image) {
        formData.append('image', params.image);
    }
    return axios.post<T, SuccessResponseType<T>>("admin/category/" + params.id, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<CategoryResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/" + id)
        .then((res) => res?.data?.result?.data)
};
export const search = async <T extends ServerResponse<CategoryResponse[]>>
(
    params: {
        query: string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/search/category", params)
        .then((res) => res?.data?.result?.data)
};


export const productOfCategory = async <T extends ServerResponse<ProductResponse[]>>
(
    id: number
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/" + id + "/product")
        .then((res) => res?.data?.result.data)
};
export const sort = async <T extends ServerResponse<unknown>>
(param: {
     product: {
         id: number
         sort: number
     }[]
 }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/category/sort", param)
        .then((res) => res?.data)
};

export const deleteImage = async <T extends ServerResponse<unknown>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/category/" + id + "/image")
        .then((res) => res?.data)
};
