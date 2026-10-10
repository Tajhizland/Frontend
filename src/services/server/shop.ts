import {publicShopRead} from "./publicShop";
import type {ProductPageResponse, DiscountedProductPageResponse, StockProductPageResponse, SpecialProductPageResponse} from "@/services/types/product";
import type {CategoryListing} from "@/services/types/category";
import type {BrandListingResponse, BrandPageResponse} from "@/services/types/brand";
import type {NewsResponse, NewsListingResponse} from "@/services/types/news";
import type {VlogPageResponse, VlogListingResponse, VlogCategoryListingResponse} from "@/services/types/vlog";
import type {CastResponse, CastListingResponse} from "@/services/types/cast";
import type {PageResponse} from "@/services/types/page";
import type {GuarantyResponse} from "@/services/types/guaranty";
import type {LandingResponse} from "@/services/types/landing";

const listingPath = (path: string, page: number, filter = "") => `${path}?page=${page}${filter ? `&${filter}` : ""}`;

export const findProductByUrl = (url: string) => publicShopRead<ProductPageResponse>("product/find", url);
export const findGroupByUrl = (url: string) => publicShopRead<ProductPageResponse>("group/find", url);
export const findCategoryByUrl = (url: string, filter = "", page = 1) =>
    publicShopRead<CategoryListing>(listingPath("category/find", page, filter), url, !filter);
export const findCategoryGroupByUrl = (url: string, filter = "", page = 1) =>
    publicShopRead<CategoryListing>(listingPath("category/group", page, filter), url, !filter);
export const findBrandByUrl = (url: string, filter = "", page = 1) =>
    publicShopRead<BrandListingResponse>(listingPath("brand/find", page, filter), url, !filter);
export const getBrandList = () => publicShopRead<BrandPageResponse>("brand");
export const findNewsByUrl = (url: string) => publicShopRead<NewsResponse>("news/find", url);
export const findVlogByUrl = (url: string) => publicShopRead<VlogPageResponse>("vlog/find", url);
export const findCast = (url: string) => publicShopRead<CastResponse>("cast/find", url);
export const findPageByUrl = (url: string) => publicShopRead<PageResponse>("page/find", url);
export const findByUrl = (url: string) => publicShopRead<GuarantyResponse>("guaranty/find", url);
export const findLandingByUrl = (url: string) => publicShopRead<LandingResponse>("landing/find", url);
export const getVlogByCategoryPaginated = (url: string, page: number, filter = "") =>
    publicShopRead<VlogCategoryListingResponse>(listingPath("vlog/category", page, filter), url, !filter);
export const getNewsPaginated = (page: number, filter = "") =>
    publicShopRead<NewsListingResponse>(listingPath("news", page, filter), undefined, !filter);
export const getVlogPaginated = (page: number, filter = "") =>
    publicShopRead<VlogListingResponse>(listingPath("vlog", page, filter), undefined, !filter);
export const paginatedCast = (page: number, filter = "") =>
    publicShopRead<CastListingResponse>(listingPath("cast", page, filter), undefined, !filter);
export const getDiscountedProducts = (page = 1, filter = "") =>
    publicShopRead<DiscountedProductPageResponse>(listingPath("product/discount", page, filter), undefined, !filter);
export const getStockProductsPaginate = (page = 1, filter = "") =>
    publicShopRead<StockProductPageResponse>(listingPath("product/stock", page, filter), undefined, !filter);
export const getSpecialProductsPaginate = (page = 1) =>
    publicShopRead<SpecialProductPageResponse>(listingPath("special-product", page));
