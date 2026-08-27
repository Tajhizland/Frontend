import {Identified, Timestamps} from "@/services/http";
export interface GuarantyBase {
    name: string;
    url: string;
    free: number;
    description: string;
}

export interface GuarantyResponse extends GuarantyBase, Identified, Timestamps {
    icon: string;
    status: number;
}

export interface GuarantyStoreDto extends GuarantyBase {
    status: number | string;
    icon?: File | undefined;
}

export type GuarantyUpdateDto = GuarantyStoreDto;
