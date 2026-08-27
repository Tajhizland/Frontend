export type PageResponse = {
    id: number,
    title:string ;
    url:string ;
    content:string ;
    image:string ;
    status:number ;
    created_at: string,
    updated_at: string,
}

export interface PageStoreDto {
    title:string;
    url:string;
    status:number|string;
    image: File | null;
    content:string;
}

export interface PageUpdateDto {
    title:string;
    url:string;
    status:number|string;
    image: File | null;
    content:string;
}
