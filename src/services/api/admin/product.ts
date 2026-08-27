import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {ProductResponse} from "@/services/types/product";
import {tableFetcher} from "@/shared/Table/fetcher";
import {ProductGroupChangeDigipayDto, ProductGroupChangeDigipayPercentDto, ProductGroupChangePriceDto, ProductGroupChangeSnappayDto, ProductGroupChangeStatusDto, ProductGroupChangeStockDto, ProductSearchDto, ProductSearchProductListDto, ProductSetVideoDto, ProductStoreDto, ProductUpdateDto} from "@/services/types/product";

export const productTable = tableFetcher<ProductResponse>("admin/product/dataTable");
export const productDiscountedTable = tableFetcher<ProductResponse>("admin/product/has-discount-dataTable");
export const productLimitedTable = tableFetcher<ProductResponse>("admin/product/has-limit-dataTable");
export const productStockTable = tableFetcher<ProductResponse>("admin/product/stock/dataTable");

export const dataTable = async <T extends ServerResponse<ProductResponse>>
() => {
    return axios.get("admin/product/dataTable")
        .then((res) => res?.data?.result)
};

export const findById = async <T extends ServerResponse<ProductResponse>>
(id: number | string) => {
    return axios.get<T, SuccessResponseType<T>>("admin/product/" + id)
        .then((res) => res?.data?.result?.data)
};

export const store = async <T extends ServerResponse<unknown>>
(dto: ProductStoreDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product", dto)
        .then((res) => res?.data)
};

export const update = async <T extends ServerResponse<unknown>>
(id: number, dto: ProductUpdateDto) => {
    return axios.put<T, SuccessResponseType<T>>("admin/product/" + id, dto)
        .then((res) => res?.data)
};

export const search = async <T extends ServerResponse<ProductResponse[]>>
(dto: ProductSearchDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/search/product", dto)
        .then((res) => res?.data?.result?.data)
};

export const setVideo = async <T extends ServerResponse<unknown>>
(dto: ProductSetVideoDto) => {

    return axios.post<T, SuccessResponseType<T>>("admin/product/video", dto)
        .then((res) => res?.data)
};


export const searchProductList = async <T extends ServerResponse<ProductResponse[]>>
(dto: ProductSearchProductListDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/product/search-list", dto)
        .then((res) => res?.data?.result?.data)
};

export const groupChangePrice = async <T extends ServerResponse<unknown>>
(dto: ProductGroupChangePriceDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/product/group-change", dto)
        .then((res) => res?.data)
};
export const groupChangeStock = async <T extends ServerResponse<unknown>>
(dto: ProductGroupChangeStockDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/product/group-change-stock", dto)
        .then((res) => res?.data)
};
export const groupChangeStatus = async <T extends ServerResponse<unknown>>
(dto: ProductGroupChangeStatusDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/product/group-change-status", dto)
        .then((res) => res?.data)
};

export const groupChangeDigipay = async <T extends ServerResponse<unknown>>
(dto: ProductGroupChangeDigipayDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/product/group-change-digipay", dto)
        .then((res) => res?.data)
};

export const groupChangeSnappay = async <T extends ServerResponse<unknown>>
(dto: ProductGroupChangeSnappayDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/product/group-change-snappay", dto)
        .then((res) => res?.data)
};


export const groupChangeDigipayPercent = async <T extends ServerResponse<unknown>>
(dto: ProductGroupChangeDigipayPercentDto) => {
    return axios.patch<T, SuccessResponseType<T>>("admin/product/group-change-percent", dto)
        .then((res) => res?.data)
};
