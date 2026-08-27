import {Identified, Timestamps} from "@/services/http";
export interface PageBase {
    title:string;
    url:string;
    content:string;
}

export interface PageResponse extends PageBase, Identified, Timestamps {
    image:string;
    status:number;
}

export interface PageStoreDto extends PageBase {
    status:number|string;
    image?: File | null;
}

export type PageUpdateDto = PageStoreDto;
