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

/** نسخه سبک GuarantyResponse که در کارت محصول برمی‌گردد. */
export interface GuarantyCardResponse {
    id: number;
    name: string;
    url: string;
    icon: string;
    free: number;
}
