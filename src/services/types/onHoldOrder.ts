
import {OrderResponse} from "@/services/types/order";

export type OnHoldOrderResponse = {
    id: number;
    order_id: number;
    status: number;
    expire_date: string;
    expire_date_time: number;
    review_date: string;
    created_at: string;
    updated_at: string;

    order?: OrderResponse;
};

/** یک قلم از سفارش معلق در صفحه‌ی چک‌اوت — قیمت‌ها فریزشده‌ی زمان ثبت سفارش‌اند */
export type OnHoldCheckoutItem = {
    id: number;
    count: number;
    hasStock: boolean;
    product: {
        id: number,
        name: string,
        allow_digipay?: number,
        allow_snappay?: number,
        url: string,
        digipay_extra_price: number,
        image: string,
    };
    color: {
        id: number,
        title: string,
        code: string,
        status: number,
        delivery_delay: number,
        /** قیمت واحد در زمان ثبت سفارش */
        price: number,
        /** مبلغ تخفیف هر واحد؛ صفر یعنی بدون تخفیف */
        discount: number,
        discountedPrice: number,
    };
    guaranty: {
        id: number | null,
        name: string | null,
        free: number | null,
        /** قیمت گارانتی هر واحد */
        price: number,
    };
};

export type OnHoldCheckoutResponse = {
    id: number;
    order_id: number;
    status: number;
    expire_date: string;
    expire_date_time: number;
    order: {
        id: number;
        status: number;
        payment_method: number;
        delivery_method: number;
        delivery_price: number;
        final_price: number;
    };
    items: OnHoldCheckoutItem[];
};
