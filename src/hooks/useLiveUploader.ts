"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {
    LiveUploader,
    LiveUploadResult,
    UploadCanceledError,
    UploadPhase,
    UploadProgress,
} from "@/services/upload/liveUploader";
import {UploadProfile} from "@/services/types/upload";

const EMPTY_PROGRESS: UploadProgress = {
    loaded: 0,
    total: 0,
    percent: 0,
    speed: 0,
    eta: null,
};

type Options = {
    profile: UploadProfile;
    concurrency?: number;
    onDone?: (result: LiveUploadResult) => void;
};

/**
 * رابط ری‌اکتیِ LiveUploader.
 *
 * `key` بعد از پایان موفق آپلود پر می‌شود و همان چیزی است که باید همراه
 * فرم به بک‌اند فرستاده شود.
 */
export default function useLiveUploader({profile, concurrency, onDone}: Options) {
    const [phase, setPhase] = useState<UploadPhase>("idle");
    const [progress, setProgress] = useState<UploadProgress>(EMPTY_PROGRESS);
    const [key, setKey] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const uploaderRef = useRef<LiveUploader | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            // خروج از صفحه نباید پارت‌های نیمه‌کاره را روی S3 رها کند
            uploaderRef.current?.cancel();
        };
    }, []);

    const reset = useCallback(() => {
        uploaderRef.current?.cancel();
        uploaderRef.current = null;
        setPhase("idle");
        setProgress(EMPTY_PROGRESS);
        setKey(null);
        setError(null);
        setFile(null);
    }, []);

    const cancel = useCallback(() => {
        uploaderRef.current?.cancel();
        uploaderRef.current = null;
    }, []);

    const upload = useCallback(async (target: File): Promise<string | null> => {
        uploaderRef.current?.cancel();

        setFile(target);
        setKey(null);
        setError(null);
        setProgress({...EMPTY_PROGRESS, total: target.size});

        const uploader = new LiveUploader({
            file: target,
            profile,
            concurrency,
            onPhase: (value) => mountedRef.current && setPhase(value),
            onProgress: (value) => mountedRef.current && setProgress(value),
        });

        uploaderRef.current = uploader;

        try {
            const result = await uploader.start();

            if (!mountedRef.current) return null;

            setKey(result.key);
            onDone?.(result);

            return result.key;
        } catch (e: any) {
            if (!mountedRef.current) return null;

            if (e instanceof UploadCanceledError) {
                setPhase("canceled");
                return null;
            }

            setPhase("error");
            setError(e?.message ?? "آپلود ناموفق بود");

            return null;
        } finally {
            if (uploaderRef.current === uploader) uploaderRef.current = null;
        }
    }, [profile, concurrency, onDone]);

    return {
        phase,
        progress,
        key,
        error,
        file,
        upload,
        cancel,
        reset,
        isUploading: phase === "preparing" || phase === "uploading" || phase === "finalizing",
        isDone: phase === "done",
    };
}
