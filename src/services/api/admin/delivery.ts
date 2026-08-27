import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {DeliveryResponse} from "@/services/types/delivery";
import {tableFetcher} from "@/shared/Table/fetcher";
import {uploadConfig} from "@/services/uploadConfig";
import {DeliveryStoreDto, DeliveryUpdateDto} from "@/services/types/delivery";
import {UploadProgress, toFormData} from "@/services/http";

export const deliveryTable = tableFetcher<DeliveryResponse>("admin/delivery/dataTable");

export const store = async <T extends ServerResponse<unknown>>(dto: DeliveryStoreDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/delivery", toFormData(dto), uploadConfig(onProgress))
        .then((res) => res?.data);
};
export const update = async <T extends ServerResponse<unknown>>(id: number, dto: DeliveryUpdateDto, onProgress?: UploadProgress) => {
    return axios.post<T, SuccessResponseType<T>>("admin/delivery/" + id, toFormData(dto, "PUT"), uploadConfig(onProgress))
        .then((res) => res?.data);
};

export const findById = async <T extends ServerResponse<DeliveryResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/delivery/"+id )
        .then((res) => res?.data?.result?.data)
};
