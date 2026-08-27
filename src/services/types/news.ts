import {Identified, Timestamps} from "@/services/http";
import {BannerResponse} from "@/services/types/banner";
import {BlogCategoryResponse} from "@/services/types/blogCategory";

export type NewsListingResponse = {
    listing:{data:NewsResponse[]}
    lastPost:{data:NewsResponse[]}
    category:{data:BlogCategoryResponse[]}
    banner:{data:BannerResponse[]}
};
export interface NewsBase {
    title:string;
    url:string;
    content:string;
}

export interface NewsResponse extends NewsBase, Identified, Timestamps {
    category_id:number;
    img:string;
    author:string;
    published:number;
    static:string;
}

export interface NewsStoreDto extends NewsBase {
    published:number|string;
    categoryId:number;
    image?: File | null;
}

export type NewsUpdateDto = NewsStoreDto;
