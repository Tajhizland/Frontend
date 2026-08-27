
export interface ProductGroupAddFieldDto {
    groupId:number;
    title:string;
}

export interface ProductGroupAddProductDto {
    groupId:number;
    productId:number;
}

export interface ProductGroupSetFieldValueDto {
    groupProductId:number;
    fieldId:number;
    value:string;
}
