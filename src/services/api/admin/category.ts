import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";
import {CategoryResponse} from "@/services/types/category";

export const categoryList = async <T extends ServerResponse<CategoryResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/category/list")
        .then((res) => res?.data?.result)
};

