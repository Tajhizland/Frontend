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
import {breadcrumbResponse} from "@/services/types/category";

export type ProductPageResponse = {
    product: ProductResponse;
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
    banner: { data: BannerResponse[] };
    discounts: { data: PopularProductResponse[] };
    discountTimer: PriceResponse;
}
export type StockProductPageResponse = {
    data: ProductResponse;
    banner: { data: BannerResponse[] };
    discounts: { data: PopularProductResponse[] };
    discountTimer: PriceResponse;
}
export type ProductResponse = {
    id: number;
    name: string;
    url: string;
    status: number;
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
    unboxing?: VlogResponse;
    intro?: VlogResponse;
    usage?: VlogResponse;
    guaranties: {
        data: GuarantyResponse[]
    };
    colors: {
        data: ColorResponse[]
    };
    images: {
        data: ProductImageResponse[]
    };
    videos: {
        data: ProductVideoResponse[]
    };
    productOptions: {
        data: ProductOptionResponse[]
    };
    comments: {
        data: CommentResponse[]
    };
    groupItems: {
        data: GroupProductResponse[]
    };
};
