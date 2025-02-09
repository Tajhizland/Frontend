import {BannerResponse} from "@/services/types/banner";

export type NewsListingResponse = {
    listing:{data:NewsResponse[]}
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
