import {ProductResponse} from "@/services/types/product";
import {CartResponse} from "@/services/types/cart";
import {createGlobalState} from 'react-hooks-global-state';
import {UserResponse} from "@/services/types/user";
import {ColorResponse} from "../types/color";
import {MenuResponse} from "@/services/types/menu";
import {GuarantyResponse} from "@/services/types/guaranty";


// مقداردهی اولیه سبد خرید و اطلاعات کاربر
interface State {
    user: UserResponse | null;
    cart: CartResponse[];
    menu: MenuResponse[];
}

const initialState: State = {
    user: null,
    cart: [],
    menu: [],
};

// توابع تغییر دهنده state
export const {useGlobalState, getGlobalState, setGlobalState} = createGlobalState(initialState);

export const useUser = () => useGlobalState('user');
export const useCart = () => useGlobalState('cart');
export const useMenu = () => useGlobalState('menu');

export const setCart = (cart: CartResponse[]) => {
    setGlobalState('cart', cart);
};
export const setMenu = (menu: MenuResponse[]) => {
    setGlobalState('menu', menu);
};
export const setUser = (user: UserResponse) => {
    setGlobalState('user', user);
};

// تابع افزودن محصول به سبد خرید
export const reduxAddToCart = (product: ProductResponse, quantity: number, color: ColorResponse, guaranty: GuarantyResponse|undefined=undefined) => {
    const cart = getGlobalState('cart');

    const existingProductIndex = cart.findIndex(item => item.color.id === color.id && item.guaranty.id == guaranty?.id);

    // محاسبه‌ی قیمت تخفیف‌خورده مطابق منطق صفحه‌ی محصول:
    // منبع اصلی تخفیف، discountItem رنگ است (نه فیلد discountedPrice).
    const basePrice = color?.price || product.min_price;
    const discountItemPrice = color?.discountItem?.data?.[0]?.discount_price;
    let discountedPrice = basePrice;
    if (discountItemPrice && discountItemPrice > 0 && discountItemPrice < basePrice) {
        discountedPrice = discountItemPrice;
    } else if (color?.discountedPrice && color.discountedPrice > 0 && color.discountedPrice < basePrice) {
        discountedPrice = color.discountedPrice;
    }

    const cartProduct: CartResponse = {
        id: product.id,
        count: quantity,
        hasStock: true,
        product: {
            name: product.name,
            digipay_extra_price: product.digipay_extra_price,
            url: product.url,
            image: product.images.data[0]?.url || "",
        },
        color: {
            id: color?.id || "",
            title: color?.color_name || "",
            code: color?.color_code || "",
            status: color?.status || 1,
            delivery_delay: color?.delivery_delay || 0,
            price: basePrice,
            discount: color?.discount || 0,
            discountedPrice: discountedPrice,
        },
        guaranty: {
            id: guaranty!=undefined?guaranty.id:null,
            name: guaranty!=undefined?guaranty.name:null,
            free: guaranty!=undefined?guaranty.free:null,
        }
    };

    let newCart;
    if (existingProductIndex !== -1) {
        // اگر محصول وجود دارد، تعداد آن را افزایش دهید
        newCart = cart.map((item, index) =>
            index === existingProductIndex
                ? {...item, count: item.count + quantity}
                : item
        );
    } else {
        // اگر محصول جدید است، آن را اضافه کنید
        newCart = [...cart, cartProduct];
    }
    setCart(newCart);
};
// سایر توابع
export const reduxRemoveFromCart = (colorId: number ,guarantyId:number|undefined) => {
    const cart = getGlobalState('cart');
    const newCart = cart.filter(item => !(item.color.id === colorId && item.guaranty.id == guarantyId));
    setGlobalState('cart', newCart);
};

export const reduxIncrementQuantity = (colorId: number,guarantyId:number|undefined) => {
    const cart = getGlobalState('cart');
    const newCart = cart.map(item =>
        item.color.id === colorId && item.guaranty.id==guarantyId
            ? {...item, count: item.count + 1}
            : item
    );
    setGlobalState('cart', newCart);
};
export const reduxDecrementQuantity = (colorId: number,guarantyId:number|undefined) => {
    const cart = getGlobalState('cart');
    const newCart = cart.map(item =>
        item.color.id === colorId && item.count > 1  && item.guaranty.id==guarantyId
            ? {...item, count: item.count - 1}
            : item
    );
    setGlobalState('cart', newCart);
};
