import { ColorResponse } from "./color";
import { OrderResponse } from "./order";
import { ProductResponse } from "./product";

export type OrderItemResponse = {
    id: number;
    count:number;
    price:number;
    discount:number;
    final_price:number;
    product_id:number;
    product_color_id:number;
    order_id:number;
    order:OrderResponse;
    product:ProductResponse;
    productColor:ColorResponse
    created_at: string;
    updated_at: string;

};
