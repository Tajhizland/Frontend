import Axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import toast from "react-hot-toast";
import {getCookie} from "cookies-next";
import {notFound, redirect} from "next/navigation";

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


const errorHandler = (error: AxiosError) => {
    if (error.response?.status === 404) {
        notFound(); // اجرای صفحه not-found.tsx
    }
    // مدیریت خطای 500
    if (error.response?.status === 500) {
        throw new Error("500"); //   خطا برای رندر صفحه خطای 500
    }

    if (error.response?.status === 301) {
        //@ts-ignore
        const redirectUrl = encodeURI(error.response?.data?.result?.destination || "/");
        return redirect(redirectUrl);
    }

    // مدیریت سایر خطاها
    if (error.response?.status === 401) {
        toast.error("خطای دسترسی: دوباره وارد شوید");
    }
    if (error.response?.status === 400) {
        //@ts-ignore
        toast.error(error?.response?.data?.message as string);
        return ;

    }
    if (error.response?.status === 422) {
        //@ts-ignore
        toast.error(error?.response?.data?.message as string);
        return ;
    }
    throw error;
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
            return Promise.reject(
                new AxiosError(res.data.message || "خطای سرور")
            );
        }

        return res;
    },
    errorHandler // مدیریت خطا در پاسخ
);


export default axios;
