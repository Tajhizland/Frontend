import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {
    CompletedPart,
    CompleteUploadResponse,
    InitiateUploadResponse,
    SignedPart,
    UploadProfile,
} from "@/services/types/upload";

/**
 * این سه اندپوینت هیچ‌وقت بدنه‌ی فایل را جابه‌جا نمی‌کنند؛ فقط URL امضاشده
 * می‌گیرند و در پایان آبجکت را تأیید می‌کنند. خود فایل مستقیم از مرورگر
 * به S3 می‌رود (به liveUploader نگاه کنید).
 */

export const initiate = async <T extends ServerResponse<InitiateUploadResponse>>(
    params: {
        profile: UploadProfile;
        fileName: string;
        size: number;
        mime: string;
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/upload/initiate", params)
        .then((res) => res?.data?.result?.data);
};

export const signParts = async <T extends ServerResponse<{ urls: SignedPart[] }>>(
    params: {
        key: string;
        partNumbers: number[];
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/upload/sign-parts", params)
        .then((res) => res?.data?.result?.data?.urls);
};

export const complete = async <T extends ServerResponse<CompleteUploadResponse>>(
    params: {
        key: string;
        parts: CompletedPart[];
    }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/upload/complete", params)
        .then((res) => res?.data?.result?.data);
};

export const abort = async <T extends ServerResponse<unknown>>(
    params: { key: string }
) => {
    return axios.post<T, SuccessResponseType<T>>("admin/upload/abort", params)
        .then((res) => res?.data);
};
