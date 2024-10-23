import { OrderInfoResponse } from "./orderInfo";
import { OrderItemResponse } from "./orderItem";
import {DeliveryResponse} from "@/services/types/delivery";
import {GatewayResponse} from "@/services/types/gateway";

export type OrderResponse = {
    id: number;
    user_id: string;
    price: number;
    delivery_price: number;
    final_price: number;
    status: number;
    payment_method: number;
    order_date: string;
    delivery_date: string;
    created_at: string;
    orderInfo?:OrderInfoResponse;
    delivery?:DeliveryResponse;
    payment?:GatewayResponse;
    orderItems?:{data:OrderItemResponse[]}
};
