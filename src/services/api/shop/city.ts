import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { CityResponse } from "@/services/types/city";


export const getCity = async <T extends ServerResponse<CityResponse[]>>
(province_id :number
) => {
    return axios.get<T, SuccessResponseType<T>>("province/"+province_id+"/city")
        .then((res) => res?.data.result.data)
};