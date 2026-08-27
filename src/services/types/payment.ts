
export type PaymentResponse = {
    path: string;
    type: string;
};

export interface PaymentSnappayEligibleDto {
    amount: number;
}
