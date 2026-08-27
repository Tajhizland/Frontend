import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {GatewayResponse} from "@/services/types/gateway";
import {tableFetcher} from "@/shared/Table/fetcher";
import {GatewayStoreDto, GatewayUpdateDto} from "@/services/types/gateway";

export const gatewayTable = tableFetcher<GatewayResponse>("admin/gateway/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: GatewayStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/gateway" , dto)
        .then((res) => res?.data)
};
export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: GatewayUpdateDto) => {
    return axios.put<T, SuccessResponseType<T>>("admin/gateway/" + id , dto)
        .then((res) => res?.data)
};

export const findById = async <T extends ServerResponse<GatewayResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/gateway/"+id )
        .then((res) => res?.data?.result?.data)
};
