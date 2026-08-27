import {Identified, Timestamps} from "@/services/http";
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
export interface ProductBase {
    name: string;
    url: string;
    type: string;
    status: number;
    brand_id: number;
    is_stock: number;
    description: string;
    meta_description: string;
    meta_title: string;
    guaranty_time: number;
    study: string;
    review: string;
    stock_of: number;
    testing_time: number;
    weight: number;
    length: number;
    height: number;
    width: number;
    use_packet: number;
}

export interface ProductResponse extends ProductBase, Identified, Timestamps {
    digipay_extra_price: number;
    view: number;
    brand_name: string;
    brand: BrandResponse;
    category_id: number;
    category_ids: number[];
    category: string;
    guaranty_id: number;
    guaranty_ids: number[];
    guaranty: GuarantyResponse;
    min_price: number;
    rating: number;
    favorite: boolean;
    unboxing_video: string;
    intro_video_description: string;
    unboxing_video_description: string;
    usage_video_description: string;
    intro_video: string;
    usage_video: string;
    images_count: number;
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
}

export interface ProductStoreDto extends ProductBase {
    guaranty_id: string;
    categoryId: string;
}

export type ProductUpdateDto = ProductStoreDto;

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
