export type CartResponse = {
    id: number;
    count: number;
    hasStock: boolean;
    product: {
        name: string,
        allow_digipay?: number,
        allow_snappay?: number,
        url: string,
        digipay_extra_price: number,
        image: string,
    };
    color: {
        id: number | string,
        title: string,
        code: string,
        status: number,
        delivery_delay: number,
        price: number,
        discount: number,
        discountedPrice: number,
    },
    guaranty: {
        id: number | null,
        name: string | null,
        free: number | null
    }

};
