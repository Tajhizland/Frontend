import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";
import {FavoriteAddToFavoriteDto, FavoriteDeleteFromFavoriteDto} from "@/services/types/favorite";

export const getFavorite = async <T extends ServerResponse<ProductResponse[]>>
(page:number=1) => {
    return axios.get<T, SuccessResponseType<T>>("favorite?page="+page)
        .then((res) => res?.data?.result)
};
export const addToFavorite = async <T extends ServerResponse<unknown>>
(dto: FavoriteAddToFavoriteDto) => {
    return axios.post<T, SuccessResponseType<T>>("favorite" ,dto)
        .then((res) => res?.data)
};
export const deleteFromFavorite = async <T extends ServerResponse<unknown>>
(dto: FavoriteDeleteFromFavoriteDto) => {
    return axios.delete<T, SuccessResponseType<T>>("favorite" ,{data: dto})
        .then((res) => res?.data)
};
