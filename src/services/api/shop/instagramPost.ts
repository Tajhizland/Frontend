import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {InstagramPostListingResponse, InstagramPostPageResponse} from "@/services/types/instagramPost";

export const getInstagramPostPaginated = async <T extends ServerResponse<InstagramPostListingResponse>>
(page: number, filters?: string) => {
    return axios.get<T, SuccessResponseType<T>>("instagram-post?" + "page=" + page + "&" + (filters ?? ""))
        .then((res) => res?.data?.result?.data);
};

/**
 * چون این درخواست POST است، اینترسپتور یک ۴۰۴ را مثل خطای عملیات toast می‌کند؛
 * لینک اشتراک‌گذاریِ پستِ حذف‌شده نباید پیام «عملیات انجام نشد» بدهد،
 * پس خطا خاموش می‌ماند و خود فید پیام مناسب را نشان می‌دهد.
 */
export const findInstagramPostByUrl = async <T extends ServerResponse<InstagramPostPageResponse>>
(url: string) => {
    return axios.post<T, SuccessResponseType<T>>("instagram-post/find", {url: url}, {silentError: true})
        .then((res) => res?.data?.result?.data);
};
