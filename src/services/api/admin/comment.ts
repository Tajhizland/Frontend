import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {CommentResponse} from "@/services/types/comment";
import {tableFetcher} from "@/shared/Table/fetcher";

export const commentTable = tableFetcher<CommentResponse>("admin/comment/dataTable");

export const findById = async <T extends ServerResponse<CommentResponse>>
(
    id:number|string
) => {
    return axios.get<T, SuccessResponseType<T>>("admin/comment/"+id )
        .then((res) => res?.data?.result?.data)
};
export const accept = async <T extends ServerResponse<unknown>>
(
    id:number|string
) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/comment/"+id+"/accept" )
        .then((res) => res?.data)
};
export const reject = async <T extends ServerResponse<unknown>>
(
    id:number|string
) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/comment/"+id+"/reject" )
        .then((res) => res?.data)
};

export type AdminCommentDto = {author_name: string; text: string; rating: number};

export const productComments = async (productId: number) => {
    return axios.get<ServerResponse<CommentResponse[]>, SuccessResponseType<ServerResponse<CommentResponse[]>>>(`admin/product/${productId}/comments`)
        .then(res => res.data.result.data);
};

export const saveProductComment = async (productId: number, dto: AdminCommentDto, id?: number) => {
    const url = `admin/product/${productId}/comments`;
    if (id) return axios.put(`${url}/${id}`, dto);
    return axios.post(url, dto);
};

export const deleteProductComment = (productId: number, id: number) =>
    axios.delete(`admin/product/${productId}/comments/${id}`);
