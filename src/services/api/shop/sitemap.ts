 import {SitemapResponse} from "@/services/types/sitemap";
 import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";

export const productSitemap = async <T extends ServerResponse<SitemapResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("sitemap/product")
        .then((res) => res?.data?.result?.data)
};
export const categorySitemap = async <T extends ServerResponse<SitemapResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("sitemap/category")
        .then((res) => res?.data?.result?.data)
};
export const brandSitemap = async <T extends ServerResponse<SitemapResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("sitemap/brand")
        .then((res) => res?.data?.result?.data)
};
export const blogSitemap = async <T extends ServerResponse<SitemapResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("sitemap/blog")
        .then((res) => res?.data?.result?.data)
};
export const vlogSitemap = async <T extends ServerResponse<SitemapResponse[]>>
() => {
    return axios.get<T, SuccessResponseType<T>>("sitemap/vlog")
        .then((res) => res?.data?.result?.data)
};
