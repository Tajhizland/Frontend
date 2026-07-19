export type TokenResponse = {
    token:string ;
};
export type UnknownResponse = unknown;

export type CheckResponse = {
    exists: boolean;
    has_password: boolean;
};

export type OtpSendResponse = {
    is_new_user: boolean;
};

export type OtpVerifyResponse = {
    is_new_user: boolean;
    token: string | null;
};
