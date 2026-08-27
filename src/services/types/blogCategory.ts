import {CityResponse} from "@/services/types/city";
import {ProviceResponse} from "@/services/types/province";

export type BlogCategoryResponse = {
    id:number ;
    url:string ;
    name:string ;
    status:number ;
    created_at:string ;
    updated_at:string ;
};

export interface BlogCategoryStoreDto {
    name: string;
    url: string;
    status: number;
}

export interface BlogCategoryUpdateDto {
    name: string;
    url: string;
    status: number;
}
