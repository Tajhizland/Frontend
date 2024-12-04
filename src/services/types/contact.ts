import {CityResponse} from "@/services/types/city";
import {ProviceResponse} from "@/services/types/province";

export type ContactResponse = {
    id: number;
    name: string;
    mobile: string;
    message: string;
    city_id:number,
    province_id:number,
    city:CityResponse,
    province:ProviceResponse,
    concept:string,
    created_at: string;
    updated_at: string;
};
