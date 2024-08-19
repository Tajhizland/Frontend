import Axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig} from 'axios';

const API_URL = process.env.BACKEND_API_URL ;

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

const axios: AxiosInstance = Axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {
            // toast.error(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            // toast.error('No response received from the server');
        } else {
            // toast.error(`Error: ${error.message}`);
        }
        return Promise.reject(error);
    }
);

export default axios;
