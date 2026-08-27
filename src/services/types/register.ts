
export interface RegisterRegisterSendCodeDto {
    mobile?: string;
}

export interface RegisterRegisterVerifyCodeDto {
    mobile: string;
    code: string;
}

export interface RegisterRegisterUserDto {
    mobile: string;
    name: string;
    last_name: string;
    national_code: string;
    password: string;
    password_confirmation: string;
}
