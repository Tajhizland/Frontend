import {CityResponse} from "@/services/types/city";
import {ProviceResponse} from "@/services/types/province";

export type OrderInfoResponse = {
    id:number ;
    city_id:number ;
    province_id:number ;
    name:string ;
    tell:string ;
    mobile:string ;
    zip_code:string ;
    address:string ;
    created_at:string ;
    updated_at:string ;
    city?:CityResponse;
    province?:ProviceResponse;
};
