import { ProductResponse } from "@/services/types/product";
import { CartResponse } from "@/services/types/cart";
import { createGlobalState } from 'react-hooks-global-state';
import {UserResponse} from "@/services/types/user";



// مقداردهی اولیه سبد خرید و اطلاعات کاربر
interface State {
    user: UserResponse | null;
    cart: CartResponse[];
}

const initialState: State = {
    user: null,
    cart: [],
};

// توابع تغییر دهنده state
export const { useGlobalState , getGlobalState, setGlobalState  } = createGlobalState(initialState);

export const useUser = () => useGlobalState('user');
export const useCart = () => useGlobalState('cart');

export const setCart = (cart: CartResponse[]) => {
    setGlobalState('cart', cart);
};
export const setUser = (user: UserResponse) => {
    setGlobalState('user', user);
};

// تابع افزودن محصول به سبد خرید
export const reduxAddToCart = (product: ProductResponse, quantity: number, colorIndex: number) => {
    const cart = getGlobalState('cart');

    const existingProductIndex = cart.findIndex(item => item.color.id === product.colors.data[colorIndex].id);

    const cartProduct: CartResponse = {
        id: product.id,
        count: quantity,
        product: {
            name: product.name,
            url: product.url,
            image: product.images.data[0]?.url || "",
        },
        color: {
            id: product.colors.data[colorIndex]?.id || "",
            title: product.colors.data[colorIndex]?.color_name || "",
            code: product.colors.data[colorIndex]?.color_code || "",
            price: product.colors.data[colorIndex]?.price || product.min_price,
        },
    };

    let newCart;
    if (existingProductIndex !== -1) {
        // اگر محصول وجود دارد، تعداد آن را افزایش دهید
        newCart = cart.map((item, index) =>
            index === existingProductIndex
                ? { ...item, count: item.count + quantity }
                : item
        );
    } else {
        // اگر محصول جدید است، آن را اضافه کنید
        newCart = [...cart, cartProduct];
    }

    setGlobalState('cart', newCart);
};
// سایر توابع
export const reduxRemoveFromCart = (colorId: number) => {
    const cart = getGlobalState('cart');
    const newCart = cart.filter(item => item.color.id != colorId);
    setGlobalState('cart', newCart);
};

export const reduxIncrementQuantity = (colorId: number) => {
    const cart = getGlobalState('cart');
    const newCart = cart.map(item =>
        item.color.id === colorId
            ? { ...item, count: item.count + 1 }
            : item
    );
    setGlobalState('cart', newCart);
};
export const reduxDecrementQuantity = (colorId: number) => {
    const cart = getGlobalState('cart');
    const newCart = cart.map(item =>
        item.color.id === colorId && item.count > 1
            ? { ...item, count: item.count - 1 }
            : item
    );
    setGlobalState('cart', newCart);
};
