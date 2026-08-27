export type PhoneBockResponse = {
    id: number,
    name:string ;
    mobile:string ;
    created_at: string,
    updated_at: string,
}

export interface PhoneBockStorePhoneBockDto {
    name: string;
    mobile: string;
}

export interface PhoneBockUpdatePhoneBockDto {
    name: string;
    mobile: string;
}

export interface PhoneBockPhoneBockUploadExcelDto {
    file: File;
}
