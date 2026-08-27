export type FileManagerResponse = {
    id:number ;
    path:string ;
    type:string ;
    model_type:string ;
    model_id:string ;
    created_at:string ;
    updated_at:string ;
};

export interface FileManagerGetFilesDto {
    model_id: number;
    model_type: string;
}

export interface FileManagerUploadDto {
    model_id: number;
    model_type: string;
    file: File;
}
