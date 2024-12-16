import { ColorResponse } from "./color";
import { CommentResponse } from "./comment";
import { ProductOptionResponse } from "@/services/types/productOption";
import { ProductImageResponse } from "@/services/types/productImage";
import {GuarantyResponse} from "@/services/types/guaranty";

export type ProductPageResponse = {
    product:ProductResponse;
    relatedProduct:{data:ProductResponse[]};
}
export type ProductResponse = {
    id: number;
    name: string;
    url: string;
    status: number;
    view: number;
    description: string;
    brand_id: string;
    brand: string;
    category_id: number;
    category_ids: number[];
    meta_description: string;
    meta_title: string;
    category: string;
    guaranty_id: number;
    guaranty_time: number;
    guaranty: GuarantyResponse;
    min_price: number;
    min_discounted_price: number;
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
