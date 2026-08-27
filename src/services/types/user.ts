export type UserResponse = {
    id:number ;
    name:string ;
    national_code:string ;
    last_name:string ;
    gender:number ;
    wallet:number ;
    email:string ;
    username:string ;
    role:string ;
    avatar:string ;
    created_at:string ;

};

export interface UserUpdateDto {
    name: string;
    last_name: string;
    national_code: string;
    username: string;
    email: string;
    gender: string;
    role: string;
    role_id?: number;
}

export interface UserUpdateAdminAddressDto {
    user_id: number;
    city_id: string;
    title: string;
    province_id: string;
    tell: string;
    mobile: string;
    zip_code: string;
    address: string;
}

export interface UserAdminChangeActiveAddressDto {
    user_id: number;
}

export interface UserAdminUpdateWalletDto {
    wallet: number;
    user_id: number;
}

export interface UserGetUserByTypeDto {
    type: string;
}
