export interface TrustedBrandResponse {
    id: number;
    logo: string;
    created_at: string;
    updated_at: string;

}

export interface TrustedBrandStoreDto {
    logo: File | null;
}

export interface TrustedBrandUpdateDto {
    logo: File | null;
}
