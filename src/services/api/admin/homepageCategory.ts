import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {HomepageCategoryResponse} from "@/services/types/homepageCategory";
import {tableFetcher} from "@/shared/Table/fetcher";
import {HomepageCategorySetIconDto, HomepageCategoryStoreDto} from "@/services/types/homepageCategory";
import {toFormData} from "@/services/http";

export const homepageCategoryTable = tableFetcher<HomepageCategoryResponse>("admin/homepage-category/dataTable");

export const store = async <T extends ServerResponse<unknown>>
(dto: HomepageCategoryStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/homepage-category", dto)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/homepage-category/"+id)
        .then((res) => res?.data)
};
export const setIcon = async <T extends ServerResponse<unknown>>
(id: number, dto: HomepageCategorySetIconDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/homepage-category/" + id + "/icon", toFormData(dto))
        .then((res) => res?.data)
};
