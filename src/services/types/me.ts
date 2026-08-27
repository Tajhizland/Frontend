
export interface MeChatInfoDto {
    token: string;
}

export interface MeUpdateDto {
    name: string;
    email: string;
    gender: string;
    last_name: string;
    national_code: string;
    avatar: File | undefined;
}
