
export interface ResetPasswordResetPasswordSendCodeDto {
    mobile?: string;
}

export interface ResetPasswordResetPasswordVerifyCodeDto {
    mobile: string;
    code: string;
}

export interface ResetPasswordResetPasswordDto {
    mobile: string;
    password: string;
    password_confirmation: string;
}
