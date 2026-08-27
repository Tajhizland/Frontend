import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {BlogCategoryResponse} from "@/services/types/blogCategory";
import {tableFetcher} from "@/shared/Table/fetcher";
import {BlogCategoryStoreDto, BlogCategoryUpdateDto} from "@/services/types/blogCategory";

export const blogCategoryTable = tableFetcher<BlogCategoryResponse>("admin/blog-category/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: BlogCategoryStoreDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/blog-category", dto)
        .then((res) => res?.data);
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: BlogCategoryUpdateDto) => {

    return axios.put<T, SuccessResponseType<T>>("admin/blog-category/" + id, dto)
        .then((res) => res?.data);
};
export const findById = async <T extends ServerResponse<BlogCategoryResponse>>
(
    id: number | string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/blog-category/" + id)
        .then((res) => res?.data?.result?.data)
};
export const getList = async <T extends ServerResponse<BlogCategoryResponse[]>>
(
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/blog-category/list")
        .then((res) => res?.data?.result?.data)
};
