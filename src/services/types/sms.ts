
export interface SmsSmsSendDto {
    message: string;
    userIds: number[];
}

export interface SmsSmsSendToContactDto {
    message: string;
    mobiles: string[];
}
