import {ProductResponse} from "@/services/types/product";

export type ProductImageResponse = {
    id:number ;
    url:string ;
    product_id:string ;
    product_color_id:number|null ;
    created_at:string ;
    updated_at:string ;
    product?:ProductResponse[] ;
};
