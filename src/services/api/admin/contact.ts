import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { ContactResponse } from "@/services/types/contact";
import {tableFetcher} from "@/shared/Table/fetcher";
import {ContactStoreContactDto} from "@/services/types/contact";

export const contactTable = tableFetcher<ContactResponse>("admin/contact/dataTable");

export const storeContact = async <T extends ServerResponse<unknown>>
(dto: ContactStoreContactDto) => {
    return axios.post<T, SuccessResponseType<T>>("contact",dto )
        .then((res) => res?.data)
};
export const findById = async <T extends ServerResponse<ContactResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/contact/"+id )
        .then((res) => res?.data?.result?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(
    id:number|string
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/contact/"+id  )
        .then((res) => res?.data)
};
