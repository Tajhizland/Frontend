import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CategoryListing} from "@/services/types/category";

export const findCategoryByUrl = async <T extends ServerResponse<CategoryListing>>
(
    url: string,
    filter?: string,
    page: number = 1
) => {

    return axios.post<T, SuccessResponseType<T>>("category/find?"+ "page=" + page+"&"+  filter,  {url: url})
        .then((res) => res?.data?.result?.data)
};
