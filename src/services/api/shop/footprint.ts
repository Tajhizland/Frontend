import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";

export const footprint = async <T extends ServerResponse<unknown>>
(
    params: {
        user_id: number | undefined | null,
        path: string
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("footprint", params)
        .then((res) => res?.data)
};
