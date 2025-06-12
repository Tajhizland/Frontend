import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";

export const storeCategoryViewHistory = async <T extends ServerResponse<unknown>>
(params: {
     category_id: number
 }
) => {

    return axios.post<T, SuccessResponseType<T>>("category-view-history/store", params)
        .then((res) => res?.data)
};
