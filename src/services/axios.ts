import Axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import toast from "react-hot-toast";
import {getCookie} from "cookies-next";
import {notFound, redirect} from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export type { ServerResponse } from "@/services/http/types";
import type { ErrorEnvelope, ServerResponse } from "@/services/http/types";

export type FailedResponseType<T> = AxiosError<Extract<T, { success: false }>>;
export type SuccessResponseType<T> = AxiosResponse<Extract<T, { success: true }>>;


/** درخواست‌هایی که داده تغییر می‌دهند (POST/PUT/PATCH/DELETE) */
const isMutation = (method?: string) =>
    !!method && !["get", "head", "options"].includes(method.toLowerCase());

/** خطاهایی که اینجا toast شده‌اند تا لایه‌های بالاتر دوباره toast نکنند */
export type HandledAxiosError = AxiosError & { handledByInterceptor?: boolean };

const markHandled = (error: AxiosError): HandledAxiosError => {
    (error as HandledAxiosError).handledByInterceptor = true;
    return error as HandledAxiosError;
};

const errorHandler = (error: AxiosError) => {
    const status = error.response?.status;
    const serverMessage = (error.response?.data as ErrorEnvelope | undefined)?.message;
    const mutation = isMutation(error.config?.method);

    // رفتارهای سطح صفحه فقط برای درخواست‌های خواندنی معنی دارند؛
    // یک POST/PUT/PATCH ناموفق نباید صفحه را با not-found یا صفحه خطا جایگزین کند.
    if (!mutation) {
        if (status === 404) {
            notFound(); // اجرای صفحه not-found.tsx
        }
        if (status === 500) {
            throw new Error("500"); //   خطا برای رندر صفحه خطای 500
        }
        if (status === 301) {
            const redirectUrl = encodeURI(
                (error.response?.data as { result?: { destination?: string } } | undefined)?.result?.destination || "/"
            );
            return redirect(redirectUrl);
        }
        if (status === 400 || status === 422) {
            if (serverMessage) toast.error(serverMessage);
            return;
        }
        throw error;
    }

    // درخواست‌های تغییردهنده: پیام سرور را نشان بده و حتماً reject کن
    // تا onError در react-query اجرا شود و onSuccess به اشتباه صدا زده نشود.
    if (status === 401) {
        toast.error("خطای دسترسی: دوباره وارد شوید");
    } else {
        toast.error(serverMessage || "عملیات انجام نشد");
    }

    return Promise.reject(markHandled(error));
};

const axios: AxiosInstance = Axios.create({
    baseURL: API_URL,
    timeout: 180000000,
    headers: {
        'Content-Type': 'application/json',
        'Pragma': 'no-cache',
        "Cache-Control": "no-cache",
        'Expires': "0",
        "Access-Control-Allow-Origin": "*",
    },
});
axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getCookie("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // حذف Content-Type برای FormData
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
        }

        return config;
    },
    (error) => Promise.reject(error) // مدیریت خطا در درخواست
);

axios.interceptors.response.use(
    (res) => {
        if (!res.data.success) {
            // پاسخ 200 ولی success=false — خطا با config/response همراه شود تا قابل بررسی باشد
            return Promise.reject(
                new AxiosError(res.data.message || "خطای سرور", AxiosError.ERR_BAD_RESPONSE, res.config, res.request, res)
            );
        }

        return res;
    },
    errorHandler // مدیریت خطا در پاسخ
);


export default axios;
