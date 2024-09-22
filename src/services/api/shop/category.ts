import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CategoryListing} from "@/services/types/category";

export const findCategoryByUrl = async <T extends ServerResponse<CategoryListing>>
(
    url:string
) => {

    return axios.post<T, SuccessResponseType<T>>("category/find",{url:url})
        .then((res) => res?.data?.result?.data)
};
