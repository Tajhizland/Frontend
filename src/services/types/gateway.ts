import {Identified, Timestamps} from "@/services/http";
export interface GatewayBase {
    name:string;
    description:string;
}

export interface GatewayResponse extends GatewayBase, Identified, Timestamps {
    status: number;
}

export interface GatewayStoreDto extends GatewayBase {
    status:number|string;
}

export type GatewayUpdateDto = GatewayStoreDto;
