import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {tableFetcher} from "@/shared/Table/fetcher";
import {
    CategoryStatResponse,
    MarketingOverviewResponse,
    MarketingPeriod,
    ProductEngagementResponse,
    ProductStatResponse,
    SearchLogResponse,
    SearchTermResponse,
} from "@/services/types/marketing";

const periodQuery = ({fromDate = "", toDate = "", limit}: MarketingPeriod = {}) => {
    const params = new URLSearchParams();
    if (fromDate) params.append("fromDate", fromDate);
    if (toDate) params.append("toDate", toDate);
    if (limit) params.append("limit", String(limit));
    const query = params.toString();
    return query ? `?${query}` : "";
};

/** همه‌ی گزارش‌ها یک شکل دارند: GET با بازه‌ی زمانی، خروجی در result.data */
const report = <T,>(path: string) =>
    async <R extends ServerResponse<T>>(period?: MarketingPeriod) =>
        axios.get<R, SuccessResponseType<R>>(`admin/marketing/${path}${periodQuery(period)}`)
            .then((res) => res?.data?.result?.data);

export const overview = report<MarketingOverviewResponse>("overview");
export const topViewedProducts = report<ProductStatResponse[]>("top-viewed-products");
export const topCartProducts = report<ProductStatResponse[]>("top-cart-products");
export const topComparedProducts = report<ProductStatResponse[]>("top-compared-products");
export const topFavoriteProducts = report<ProductStatResponse[]>("top-favorite-products");
export const topCategories = report<CategoryStatResponse[]>("top-categories");
export const topSearches = report<SearchTermResponse[]>("top-searches");
export const zeroResultSearches = report<SearchTermResponse[]>("zero-result-searches");
export const conversionOpportunities = report<ProductEngagementResponse[]>("conversion-opportunities");
export const unmetDemand = report<ProductStatResponse[]>("unmet-demand");

export const searchLogTable = tableFetcher<SearchLogResponse>("admin/marketing/search-log/dataTable");
