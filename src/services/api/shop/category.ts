import axios, {ServerResponse} from "@/services/axios";
import {CategoryListing, CategoryResponse} from "@/services/types/category";

export const findCategory= async <T extends ServerResponse<CategoryListing>>
(
    url:string
) => {
    return axios.get("category/find/"+url)
        .then((res) => res?.data?.result)
};
