import {ColorResponse} from "./color";
import {CommentResponse} from "./comment";
import {ProductOptionResponse} from "@/services/types/productOption";
import {ProductImageResponse} from "@/services/types/productImage";
import {GuarantyResponse} from "@/services/types/guaranty";
import {BrandResponse} from "@/services/types/brand";
import {BannerResponse} from "@/services/types/banner";
import {VlogResponse} from "@/services/types/vlog";
import {PriceResponse} from "@/services/types/price";
import {PopularProductResponse} from "@/services/types/popularProduct";
import {ProductVideoResponse} from "@/services/types/productVideo";
import {GroupProductResponse} from "@/services/types/groupProduct";
import {breadcrumbResponse, CategoryResponse} from "@/services/types/category";
import {CampaignResponse} from "@/services/types/campaign";
import {DiscountItemResponse} from "@/services/types/discountItem";

export type ProductPageResponse = {
    product: ProductResponse;
    campaign?: CampaignResponse;
    options: { data: ProductOptionResponse[] };
    relatedProduct: { data: ProductResponse[] };
    breadcrumb: { data: breadcrumbResponse[] };
}
export type SpecialProductPageResponse = {
    data: ProductResponse;
    banner: { data: BannerResponse[] };
}
export type DiscountedProductPageResponse = {
    data: ProductResponse;
    topDiscountedProducts: { data: ProductResponse[] };
    campaign?: CampaignResponse;
    banner: { data: BannerResponse[] };
    discounts: { data: PopularProductResponse[] };
    discountTimer: DiscountItemResponse;
}
export type StockProductPageResponse = {
    data: ProductResponse;
    category: { data: CategoryResponse[] };
}
export type ProductResponse = {
    id: number;
    name: string;
    url: string;
    stock_of: number;
    testing_time: number;
    status: number;
    digipay_extra_price: number;
    view: number;
    description: string;
    brand_id: number;
    brand_name: string;
    brand: BrandResponse;
    category_id: number;
    category_ids: number[];
    meta_description: string;
    meta_title: string;
    category: string;
    guaranty_id: number;
    guaranty_ids: number[];
    guaranty_time: number;
    guaranty: GuarantyResponse;
    min_price: number;
    rating: number;
    is_stock: number;
    favorite: boolean;
    study: string;
    type: string;
    review: string;
    unboxing_video: string;
    intro_video_description: string;
    unboxing_video_description: string;
    usage_video_description: string;
    intro_video: string;
    usage_video: string;
    created_at: string;
    updated_at: string;
    images_count: number;
    weight: number;
    length: number;
    width: number;
    use_packet: number;
    height: number;

    unboxing?: VlogResponse;
    intro?: VlogResponse;
    usage?: VlogResponse;
    stockOf?: ProductResponse;
    guaranties: GuarantyResponse[];
    colors: ColorResponse[];
    images: ProductImageResponse[];
    videos: ProductVideoResponse[];
    productOptions: ProductOptionResponse[];
    comments: CommentResponse[];
    groupItems: GroupProductResponse[];
};

export interface ProductStoreDto {
    name: string;
    url: string;
    type: string;
    status: number;
    brand_id: number;
    is_stock: number;
    description: string;
    meta_description: string;
    meta_title: string;
    guaranty_id: string;
    guaranty_time: number;
    study: string;
    review: string;
    categoryId: string;
    stock_of: number;
    testing_time: number;
    weight: number;
    length: number;
    height: number;
    width: number;
    use_packet: number;
}

export interface ProductUpdateDto {
    name: string;
    url: string;
    type: string;
    status: number;
    brand_id: number;
    description: string;
    meta_description: string;
    meta_title: string;
    guaranty_id: string;
    guaranty_time: number;
    is_stock: number;
    study: string;
    review: string;
    categoryId: string;
    stock_of: number;
    testing_time: number;
    weight: number;
    length: number;
    height: number;
    width: number;
    use_packet: number;
}

export interface ProductSearchDto {
    query: string;
}

export interface ProductSetVideoDto {
    vlogId: number | null;
    productId: number;
    type: string;
}

export interface ProductSearchProductListDto {
    categoryId: number | null;
    brandId: number | null;
    discountId?: number;
    searchQuery?: string;
}

export interface ProductGroupChangePriceDto {
    action: string;
    percent: number;
    ids: number[];
}

export interface ProductGroupChangeStockDto {
    stock: number;
    ids: number[];
}

export interface ProductGroupChangeStatusDto {
    status: number;
    ids: number[];
}

export interface ProductGroupChangeDigipayDto {
    digipay: number;
    ids: number[];
}

export interface ProductGroupChangeSnappayDto {
    snappay: number;
    ids: number[];
}

export interface ProductGroupChangeDigipayPercentDto {
    percent: number;
    ids: number[];
}
