import {abort as abortUpload, complete, initiate, signParts} from "@/services/api/admin/upload";
import {CompletedPart, UploadProfile} from "@/services/types/upload";

/**
 * آپلودر مستقیم مرورگر → S3.
 *
 * فایل هرگز از سرور اپلیکیشن عبور نمی‌کند؛ بک‌اند فقط URL امضاشده می‌دهد.
 * فایل به پارت‌های چندمگابایتی تکه می‌شود و چند پارت هم‌زمان بالا می‌رود،
 * پس یک قطعی شبکه فقط همان پارت را از اول می‌فرستد نه کل فایل را.
 *
 * نکته: برای درخواست‌های S3 عمداً از XMLHttpRequest خام استفاده شده و نه
 * از axios پروژه — چون اینترسپتور، هدر Authorization را اضافه می‌کند و
 * S3 درخواستِ presigned با هدر Authorization را رد می‌کند.
 */

export type UploadPhase =
    | "idle"
    | "preparing"   // گرفتن URL های امضاشده
    | "uploading"   // در حال ارسال پارت‌ها
    | "finalizing"  // ثبت نهایی و تأیید آبجکت روی S3
    | "done"
    | "canceled"
    | "error";

export type UploadProgress = {
    loaded: number;
    total: number;
    /** درصد گردشده، همیشه بین ۰ تا ۱۰۰ */
    percent: number;
    /** بایت بر ثانیه */
    speed: number;
    /** ثانیه‌ی باقی‌مانده؛ اگر هنوز قابل تخمین نیست null */
    eta: number | null;
};

export type LiveUploaderOptions = {
    file: File;
    profile: UploadProfile;
    /** تعداد پارتی که هم‌زمان آپلود می‌شود */
    concurrency?: number;
    /** تعداد تلاش مجدد برای هر پارت */
    maxRetries?: number;
    onProgress?: (progress: UploadProgress) => void;
    onPhase?: (phase: UploadPhase) => void;
};

export type LiveUploadResult = {
    key: string;
    size: number;
};

export class UploadCanceledError extends Error {
    constructor() {
        super("آپلود لغو شد");
        this.name = "UploadCanceledError";
    }
}

const DEFAULT_CONCURRENCY = 3;
const DEFAULT_MAX_RETRIES = 3;

export class LiveUploader {
    private readonly file: File;
    private readonly profile: UploadProfile;
    private readonly concurrency: number;
    private readonly maxRetries: number;
    private readonly onProgress?: (progress: UploadProgress) => void;
    private readonly onPhase?: (phase: UploadPhase) => void;

    private key: string | null = null;
    private multipart = false;
    private partSize = 0;
    private partCount = 0;

    private signedUrls = new Map<number, string>();
    private etags = new Map<number, string>();
    private loadedPerPart: number[] = [];

    private activeRequests = new Set<XMLHttpRequest>();
    private canceled = false;

    /** نمونه‌های (زمان، بایت) برای تخمین سرعت روی پنجره‌ی متحرک */
    private samples: Array<{ at: number; loaded: number }> = [];

    constructor(options: LiveUploaderOptions) {
        this.file = options.file;
        this.profile = options.profile;
        this.concurrency = options.concurrency ?? DEFAULT_CONCURRENCY;
        this.maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
        this.onProgress = options.onProgress;
        this.onPhase = options.onPhase;
    }

    async start(): Promise<LiveUploadResult> {
        this.setPhase("preparing");

        const session = await initiate({
            profile: this.profile,
            fileName: this.file.name,
            size: this.file.size,
            mime: this.file.type || "application/octet-stream",
        });

        this.key = session.key;
        this.multipart = session.multipart;
        this.partSize = session.partSize;
        this.partCount = session.partCount;
        this.loadedPerPart = new Array(session.partCount).fill(0);
        session.urls.forEach((item) => this.signedUrls.set(item.partNumber, item.url));

        this.throwIfCanceled();
        this.setPhase("uploading");
        this.emitProgress();

        await this.uploadAllParts();

        this.throwIfCanceled();
        this.setPhase("finalizing");

        const parts: CompletedPart[] = this.multipart
            ? Array.from({length: this.partCount}, (_, index) => ({
                partNumber: index + 1,
                etag: this.etags.get(index + 1) as string,
            }))
            : [];

        const result = await complete({key: this.key, parts});

        this.setPhase("done");

        return result;
    }

    /** لغو فوری: درخواست‌های در جریان قطع و پارت‌های نیمه‌کاره روی S3 آزاد می‌شوند */
    cancel(): void {
        if (this.canceled) return;
        this.canceled = true;

        this.activeRequests.forEach((xhr) => xhr.abort());
        this.activeRequests.clear();

        this.setPhase("canceled");

        if (this.key) {
            // لغو سمت سرور بهترین‌تلاش است؛ اگر شکست بخورد upload:prune جمعش می‌کند
            abortUpload({key: this.key}).catch(() => undefined);
        }
    }

    /* ------------------------------------------------------------------ */

    /** استخر کارگر: به‌جای صف‌های ثابت، هر کارگر پارت بعدی را برمی‌دارد */
    private async uploadAllParts(): Promise<void> {
        let next = 1;

        const worker = async (): Promise<void> => {
            while (true) {
                if (this.canceled) return;

                const partNumber = next++;
                if (partNumber > this.partCount) return;

                await this.uploadPartWithRetry(partNumber);
            }
        };

        const workers = Array.from(
            {length: Math.min(this.concurrency, this.partCount)},
            () => worker()
        );

        await Promise.all(workers);
    }

    private async uploadPartWithRetry(partNumber: number): Promise<void> {
        let attempt = 0;

        while (true) {
            this.throwIfCanceled();

            try {
                const url = await this.urlFor(partNumber);
                const etag = await this.putPart(partNumber, url);

                if (this.multipart) {
                    if (!etag) {
                        throw new Error(
                            "هدر ETag از S3 خوانده نشد. روی باکت باید ETag در ExposeHeaders تنظیم شود (php artisan s3:cors)."
                        );
                    }
                    this.etags.set(partNumber, etag);
                }

                return;
            } catch (error) {
                if (this.canceled) throw new UploadCanceledError();

                attempt++;

                if (attempt > this.maxRetries) throw error;

                // امضای منقضی‌شده با یک امضای تازه جبران می‌شود
                this.signedUrls.delete(partNumber);
                this.loadedPerPart[partNumber - 1] = 0;
                this.emitProgress();

                await this.delay(Math.min(1000 * 2 ** (attempt - 1), 8000));
            }
        }
    }

    private async urlFor(partNumber: number): Promise<string> {
        const cached = this.signedUrls.get(partNumber);
        if (cached) return cached;

        // امضاها دسته‌ای و در لحظه گرفته می‌شوند تا عمرشان کوتاه بماند
        const from = partNumber;
        const to = Math.min(this.partCount, partNumber + 49);
        const partNumbers = Array.from({length: to - from + 1}, (_, index) => from + index);

        const urls = await signParts({key: this.key as string, partNumbers});
        urls.forEach((item) => this.signedUrls.set(item.partNumber, item.url));

        const url = this.signedUrls.get(partNumber);
        if (!url) throw new Error("دریافت آدرس امضاشده برای این بخش از فایل ناموفق بود.");

        return url;
    }

    private putPart(partNumber: number, url: string): Promise<string | null> {
        const start = (partNumber - 1) * this.partSize;
        const end = Math.min(start + this.partSize, this.file.size);
        const blob = this.file.slice(start, end);

        return new Promise<string | null>((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            this.activeRequests.add(xhr);

            xhr.open("PUT", url, true);

            // برای PUT ساده باید دقیقاً همان Content-Type امضاشده ارسال شود؛
            // برای پارت‌های multipart هیچ هدری ست نمی‌شود تا امضا نشکند.
            if (!this.multipart) {
                xhr.setRequestHeader("Content-Type", this.file.type || "application/octet-stream");
            }

            xhr.upload.onprogress = (event) => {
                this.loadedPerPart[partNumber - 1] = event.loaded;
                this.emitProgress();
            };

            xhr.onload = () => {
                this.activeRequests.delete(xhr);

                if (xhr.status >= 200 && xhr.status < 300) {
                    this.loadedPerPart[partNumber - 1] = blob.size;
                    this.emitProgress();
                    resolve(xhr.getResponseHeader("ETag"));
                    return;
                }

                reject(new Error(`آپلود بخش ${partNumber} ناموفق بود (کد ${xhr.status})`));
            };

            xhr.onerror = () => {
                this.activeRequests.delete(xhr);
                reject(new Error(`خطای شبکه در آپلود بخش ${partNumber}`));
            };

            xhr.onabort = () => {
                this.activeRequests.delete(xhr);
                reject(new UploadCanceledError());
            };

            xhr.send(blob);
        });
    }

    private emitProgress(): void {
        if (!this.onProgress) return;

        const loaded = this.loadedPerPart.reduce((sum, value) => sum + value, 0);
        const total = this.file.size;
        const now = Date.now();

        this.samples.push({at: now, loaded});
        // فقط ۵ ثانیه‌ی اخیر ملاک سرعت است تا عدد با نوسان شبکه واقعی بماند
        while (this.samples.length > 1 && now - this.samples[0].at > 5000) this.samples.shift();

        const oldest = this.samples[0];
        const elapsed = (now - oldest.at) / 1000;
        const speed = elapsed > 0.5 ? (loaded - oldest.loaded) / elapsed : 0;

        this.onProgress({
            loaded,
            total,
            percent: total > 0 ? Math.min(100, Math.round((loaded * 100) / total)) : 0,
            speed,
            eta: speed > 0 ? Math.round((total - loaded) / speed) : null,
        });
    }

    private setPhase(phase: UploadPhase): void {
        this.onPhase?.(phase);
    }

    private throwIfCanceled(): void {
        if (this.canceled) throw new UploadCanceledError();
    }

    private delay(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

/* ----------------------------- کمکی‌های نمایش ----------------------------- */

export function formatBytes(bytes: number): string {
    if (!Number.isFinite(bytes) || bytes <= 0) return "۰";
    if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} گیگابایت`;
    if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} مگابایت`;
    return `${(bytes / 1024).toFixed(0)} کیلوبایت`;
}

export function formatSpeed(bytesPerSecond: number): string {
    if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) return "—";
    return `${formatBytes(bytesPerSecond)} بر ثانیه`;
}

export function formatDuration(seconds: number | null): string {
    if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return "—";
    if (seconds < 60) return `${Math.round(seconds)} ثانیه`;

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} دقیقه`;

    return `${Math.floor(minutes / 60)} ساعت و ${minutes % 60} دقیقه`;
}
