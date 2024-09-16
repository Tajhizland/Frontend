import {ColorResponse} from "./color";
import {CommentResponse} from "./comment";
import {ProductOptionResponse} from "@/services/types/productOption";

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
    meta_description: string;
    meta_title: string;
    category: string;
    min_price: number;
    rating: number;
    favorite: boolean;
    study: string;
    review: string;
    created_at: string;
    updated_at: string;
    colors: {
        data: ColorResponse []
    };
    images: {
        data: ColorResponse []
    };
    productOptions: {
        data: ProductOptionResponse []
    };
    comments: CommentResponse[];
};
