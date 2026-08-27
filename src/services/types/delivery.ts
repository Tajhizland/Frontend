export type DeliveryResponse = {
    id: number;
    name: string;
    status: number;
    price: number;
    logo: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export interface DeliveryStoreDto {
    name: string;
    status: number | string;
    description: string;
    logo: File | null;
    price: string | number;
}

export interface DeliveryUpdateDto {
    name: string;
    status: number | string;
    description: string;
    logo: File | null;
    price: string | number;
}

