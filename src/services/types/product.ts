import {ColorResponse} from "./color";
import {CommentResponse} from "./comment";
import {ProductOptionResponse} from "@/services/types/productOption";
import {ProductImageResponse} from "@/services/types/productImage";
import {GuarantyResponse} from "@/services/types/guaranty";
import {BrandResponse} from "@/services/types/brand";
import {BannerResponse} from "@/services/types/banner";
import {VlogResponse} from "@/services/types/vlog";

export type ProductPageResponse = {
    product: ProductResponse;
    relatedProduct: { data: ProductResponse[] };
}
export type SpecialProductPageResponse = {
    data: ProductResponse;
    banner: { data: BannerResponse[] };
}
export type DiscountedProductPageResponse = {
    data: ProductResponse;
    banner: { data: BannerResponse[] };
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
    favorite: boolean;
    study: string;
    review: string;
    unboxing_video: string;
    intro_video_description: string;
    unboxing_video_description: string;
    usage_video_description: string;
    intro_video: string;
    usage_video: string;
    created_at: string;
    updated_at: string;
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
    productOptions: {
        data: ProductOptionResponse[]
    };
    comments: {
        data: CommentResponse[]
    };
};
