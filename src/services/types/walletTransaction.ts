import {UserResponse} from "@/services/types/user";

export interface WalletTransactionResponse {
    id: number;
    amount: number;
    status: number;
    track_id: number;
    created_at: string;
    updated_at: string;
    user_id: number;
    user?: UserResponse;

}
