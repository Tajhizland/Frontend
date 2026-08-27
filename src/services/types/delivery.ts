import {Identified, Timestamps} from "@/services/http";
export interface DeliveryBase {
    name: string;
    description: string;
}

export interface DeliveryResponse extends DeliveryBase, Identified, Timestamps {
    status: number;
    price: number;
    logo: string;
}

export interface DeliveryStoreDto extends DeliveryBase {
    status: number | string;
    logo?: File | null;
    price: string | number;
}

export type DeliveryUpdateDto = DeliveryStoreDto;

