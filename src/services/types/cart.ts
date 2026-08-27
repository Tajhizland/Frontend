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

export interface CartAddToCartDto {
    productColorId: number;
    count: number;
    guaranty_id: number|undefined;
}

export interface CartRemoveCartItemDto {
    productColorId: number;
    guaranty_id: number|undefined;
}

export interface CartIncreaseCartItemDto {
    productColorId: number;
    guaranty_id: number|undefined;
}

export interface CartDecreaseCartItemDto {
    productColorId: number;
    guaranty_id: number|undefined;
}

export interface CartClearCartDto {
    productColorId: number;
}

export interface CartMergeCartDto {
    items: {
            productColorId: number,
            count: number,
            guaranty_id?: number,
        }[];
}
