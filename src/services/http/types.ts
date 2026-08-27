/** پاسخ استاندارد سرور — همان envelope ای که بکند می‌سازد */
export type PaginationMeta = {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from?: number;
    to?: number;
    path?: string;
};

export type Paginated<T> = {
    data: T[];
    meta: PaginationMeta;
    links?: { first?: string; last?: string; prev?: string | null; next?: string | null };
};

export type SuccessEnvelope<T> = {
    success: true;
    message?: string;
    result: { data: T } & Partial<Omit<Paginated<T>, "data">>;
};

export type ErrorEnvelope = {
    success: false;
    message?: string;
    errors?: string | Record<string, string[]>;
};

export type ServerResponse<T = unknown> = SuccessEnvelope<T> | ErrorEnvelope;

/** فیلدهای مشترک هر رکوردی که از سرور می‌آید */
export type Timestamps = {
    created_at: string;
    updated_at: string;
};

export type Identified = { id: number };

/** یک منبع کامل: شناسه + فیلدهای دامنه + تاریخ‌ها */
export type Resource<T> = Identified & T & Timestamps;

/** گزارش درصد پیشرفت آپلود */
export type UploadProgress = (progress: number) => void;
