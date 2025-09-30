export interface SmsLogItemResponse {
    id: number;
    mobile: string;
    message: string;
    is_send: boolean;
    created_at: string;
    updated_at: string;
}