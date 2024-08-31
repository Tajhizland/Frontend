import Axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import toast from "react-hot-toast";
import {getCookie} from "cookies-next";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export type ServerResponse<T = unknown> =
    | {
    success: true;
    result: {
        data: T;
        meta?: {
            total: number;
            current_page: number;
            last_page: number;
            per_page: number;
        };
    };
    message?: string;
}
    | {
    success: false;
    message?: string;
    exception?: any;
};

export type FailedResponseType<T> = AxiosError<Extract<T, { success: false }>>;
export type SuccessResponseType<T> = AxiosResponse<Extract<T, { success: true }>>;

const errorHandler = (error: FailedResponseType<ServerResponse>) => {
    try {
        switch (error.code) {
            case "ERR_CANCELED":
                break;
            case "ERR_BAD_REQUEST":
                if (error.response?.status === 401) {
                    toast.error("خطای دسترسی: دوباره وارد شوید");
                    // اگر نیاز است، می‌توانید کاربر را به صفحه ورود هدایت کنید
                    // window.location.href = '/login';
                }
                throw error;
            case "ERR_BAD_RESPONSE":
                throw error;
            default:
                throw error;
        }
    } catch (caughtError) {
        if (caughtError instanceof AxiosError) {
            const message = caughtError.response?.data?.message || "خطای ناشناخته";
            toast.error(message, { position: "top-left" });
        }
    }
};

const axios: AxiosInstance = Axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    },
});

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = getCookie("token")
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error) // مدیریت خطا در درخواست
);

axios.interceptors.response.use(
    (res) => {
        if (!res.data.success) {
            return Promise.reject(
                new AxiosError(res.data.message || "خطای سرور")
            );
        }
        if (res?.data?.message) {
            toast.success(res.data.message);
        }
        return res;
    },
    errorHandler // مدیریت خطا در پاسخ
);

export default axios;
