export type GatewayResponse = {
    id: number;
    name: string;
    status: number;
    description: string;
    created_at: string;
    updated_at: string;
};

export interface GatewayStoreDto {
    name:string;
    status:number|string;
    description:string;
}

export interface GatewayUpdateDto {
    name:string;
    status:number|string;
    description:string;
}
