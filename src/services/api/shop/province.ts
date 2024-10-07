import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { ProviceResponse } from "@/services/types/province";
 
export const getProvince = async <T extends ServerResponse<ProviceResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("province/get/")
        .then((res) => res?.data.result.data)
};