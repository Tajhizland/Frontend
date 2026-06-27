import {AxiosRequestConfig} from "axios";

/**
 * کانفیگ آماده برای آپلود multipart با گزارش درصد پیشرفت.
 * در api: axios.post(url, formData, uploadConfig(params.setProgress))
 */
export const uploadConfig = (setProgress?: (progress: number) => void): AxiosRequestConfig => ({
    headers: {
        "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
        if (setProgress && progressEvent.total) {
            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
    },
});
