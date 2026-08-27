/** نام پروفایل‌ها دقیقاً باید با کلیدهای config/upload.php در بک‌اند یکی باشد */
export type UploadProfile = "vlog_video" | "product_video";

export type SignedPart = {
    partNumber: number;
    url: string;
};

export type InitiateUploadResponse = {
    key: string;
    multipart: boolean;
    uploadId: string | null;
    partSize: number;
    partCount: number;
    expiresIn: number;
    urls: SignedPart[];
};

export type CompletedPart = {
    partNumber: number;
    etag: string;
};

export type CompleteUploadResponse = {
    key: string;
    size: number;
};

/** وضعیت پردازش ویدیو سمت سرور (بعد از پایان آپلود) */
export type VideoStatus = "queued" | "processing" | "ready" | "failed";

export type VideoStatusResponse = {
    id: number;
    videoStatus: VideoStatus | null;
    videoError: string | null;
    hls: string | null;
};

export interface UploadInitiateDto {
    profile: UploadProfile;
    fileName: string;
    size: number;
    mime: string;
}

export interface UploadSignPartsDto {
    key: string;
    partNumbers: number[];
}

export interface UploadCompleteDto {
    key: string;
    parts: CompletedPart[];
}

export interface UploadAbortDto {
    key: string;
}
