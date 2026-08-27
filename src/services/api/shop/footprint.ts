import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {FootprintFootprintDto} from "@/services/types/footprint";

export const footprint = async <T extends ServerResponse<unknown>>
(dto: FootprintFootprintDto) => {
    return axios.post<T, SuccessResponseType<T>>("footprint", dto)
        .then((res) => res?.data)
};
