import axios, {ServerResponse, SuccessResponseType} from "@/services/axios";
import {MarketingEventDto} from "@/services/types/marketing";

/**
 * رویدادهایی که فقط در مرورگر رخ می‌دهند (سبد خرید مهمان، مقایسه) را به سرور می‌رساند.
 * بقیه رویدادها سمت سرور و داخل همان درخواستی که کار اصلی را می‌کند ثبت می‌شوند.
 */
export const trackMarketingEvent = async <T extends ServerResponse<unknown>>(dto: MarketingEventDto) => {
    return axios.post<T, SuccessResponseType<T>>("marketing/event", dto, {silentError: true})
        .then((res) => res?.data);
};
