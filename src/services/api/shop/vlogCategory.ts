import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {VlogResponse} from "@/services/types/vlog";
import {VlogCategoryResponse} from "@/services/types/vlogCategory";
 

export const getList = async <T extends ServerResponse<VlogCategoryResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("vlog_category/list")
        .then((res) => res?.data?.result?.data)
};
