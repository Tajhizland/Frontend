import {ProductResponse} from "@/services/types/product";

export type CommentResponse = {
    id:number ;
    user:string ;
    product_id:number ;
    product?:ProductResponse ;
    rating:string ;
    text:string ;
    status:string ;
    created_at:string ;
    updated_at:string ;
}
