import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";

export const store = async <T extends ServerResponse<unknown>>
(
    params: {
        category_id: string,
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/homepage_category/add", params)
        .then((res) => res?.data)
};
export const remove = async <T extends ServerResponse<unknown>>
(id: number
) => {
    return axios.delete<T, SuccessResponseType<T>>("admin/homepage_category/delete/"+id)
        .then((res) => res?.data)
};
export const setIcon = async <T extends ServerResponse<unknown>>
(
    params: {
        id: number,
        icon: File,
    }
) => {
    const formData = new FormData();
    formData.append('id', params.id + "");
    formData.append('icon', params.icon);

    return axios.post<T, SuccessResponseType<T>>("admin/homepage_category/setIcon",formData)
        .then((res) => res?.data)
};
