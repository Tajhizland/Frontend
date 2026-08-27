export type PosterResponse={
    id:number ;
    image:string ;
    created_at:string ;
    updated_at:string ;
}

export interface PosterStoreDto {
    image: File;
}

export interface PosterUpdateDto {
    image: File;
}
