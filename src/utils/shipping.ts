import type {DeliveryResponse} from "@/services/types/delivery";

// Display, totals and payment must all use a method from the current delivery list.
export function availableShipping(deliveries: DeliveryResponse[] | undefined, preferredId: number) {
    return deliveries?.find((item) => item.id === preferredId) ?? deliveries?.[0];
}
