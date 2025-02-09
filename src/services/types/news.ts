import {BannerResponse} from "@/services/types/banner";
import {BlogCategoryResponse} from "@/services/types/blogCategory";

export type NewsListingResponse = {
    listing:{data:NewsResponse[]}
    lastPost:{data:NewsResponse[]}
    category:{data:BlogCategoryResponse[]}
    banner:{data:BannerResponse[]}
};
export type NewsResponse = {
    id:number ;
    category_id:number ;
    title:string ;
    url:string ;
    content:string ;
    img:string ;
    author:string ;
    published:number ;
    static:string ;
    created_at:string ;
    updated_at:string ;
};
