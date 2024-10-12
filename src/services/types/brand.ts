import {ProductResponse} from "@/services/types/product";

export type BrandResponse = {
    id:number ;
    name:string ;
    url:string ;
    status:string ;
    image:string ;
    description:string ;
    created_at:string ;
    updated_at:string ;
};

export type BrandListingResponse = {
    brand:BrandResponse ;
    products: {
        data: ProductResponse[];
        meta?: {
            total: number;
            current_page: number;
            last_page: number;
            per_page: number;
        };
    };
};
