import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {UploadAbortDto, UploadCompleteDto, UploadInitiateDto, UploadSignPartsDto} from "@/services/types/upload";
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

export const initiate = async <T extends ServerResponse<InitiateUploadResponse>>(dto: UploadInitiateDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/upload/initiate", dto)
        .then((res) => res?.data?.result?.data);
};

export const signParts = async <T extends ServerResponse<{ urls: SignedPart[] }>>(dto: UploadSignPartsDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/upload/sign-parts", dto)
        .then((res) => res?.data?.result?.data?.urls);
};

export const complete = async <T extends ServerResponse<CompleteUploadResponse>>(dto: UploadCompleteDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/upload/complete", dto)
        .then((res) => res?.data?.result?.data);
};

export const abort = async <T extends ServerResponse<unknown>>(dto: UploadAbortDto) => {
    return axios.post<T, SuccessResponseType<T>>("admin/upload/abort", dto)
        .then((res) => res?.data);
};
