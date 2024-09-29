import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import { MenuResponse } from "@/services/types/menu";

export const menu = async <T extends ServerResponse<MenuResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("menu")
        .then((res) => res?.data?.result.data)
};
