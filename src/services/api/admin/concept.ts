import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ConceptResponse} from "@/services/types/concept";
import {CategoryConceptResponse} from "@/services/types/categoryConcept";


export const store = async <T extends ServerResponse<unknown>>(
    params: {
        title: string,
        description: string,
        status: number | string,
        image: File | null,
    }
) => {
    const formData = new FormData();
    formData.append('title', params.title);
     formData.append('status', params.status.toString());
    formData.append('description', params.description);

    if (params.image) {
        formData.append('image', params.image);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/concept/store", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};


export const fastUpdate = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        title: string,
        status: number | string,
    }
) => {

    return axios.post<T, SuccessResponseType<T>>("admin/concept/update", params )
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number | string,
        title: string,
        description: string,
        status: number | string,
        image: File | null,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('title', params.title);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);

    if (params.image) {
        formData.append('image', params.image);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/concept/update", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<ConceptResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/concept/find/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getItems = async <T extends ServerResponse<CategoryConceptResponse[]>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/concept/items/get/" + id)
        .then((res) => res?.data?.result?.data)
};

export const setItem = async <T extends ServerResponse<unknown>>
(
    params: {
        category_id: number | string,
        concept_id: number | string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/concept/items/set/",params)
        .then((res) => res?.data)
};

export const deleteItem = async <T extends ServerResponse<unknown>>
(
    id: number | string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/concept/items/delete/" + id)
        .then((res) => res?.data)
};
