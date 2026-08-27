import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CategoryListing} from "@/services/types/category";
import {CommentStoreCommentDto} from "@/services/types/comment";

export const storeComment = async <T extends ServerResponse<unknown>>
(dto: CommentStoreCommentDto) => {
    return axios.post<T, SuccessResponseType<T>>("comment",dto )
        .then((res) => res?.data)
};