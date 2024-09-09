import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DeliveryResponse} from "@/services/types/delivery";

export const store = async <T extends ServerResponse<unknown>>(
    params: {
        name: string,
        status: number | string,
        description: string,
        logo: File | null,
        price: string | number,
    }
) => {
     const formData = new FormData();
    formData.append('name', params.name);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);
    formData.append('price', params.price.toString());

    if (params.logo) {
        formData.append('logo', params.logo);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/delivery/store", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};
export const update = async <T extends ServerResponse<unknown>>(
    params: {
        id: number,
        name: string,
        status: number | string,
        description: string,
        logo: File | null,
        price: string | number,
    }
) => {
     const formData = new FormData();
    formData.append('id', params.id.toString());
    formData.append('name', params.name);
    formData.append('status', params.status.toString());
    formData.append('description', params.description);
    formData.append('price', params.price.toString());

    if (params.logo) {
        formData.append('logo', params.logo);
    }

    return axios.post<T, SuccessResponseType<T>>("admin/delivery/update", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<DeliveryResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/delivery/find/"+id )
        .then((res) => res?.data?.result?.data)
};
