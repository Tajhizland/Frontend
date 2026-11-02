type OnHoldStatus = {status: number; order?: {status: number}};

export function isOnHoldOrderRejected(item: OnHoldStatus) {
    return Number(item.status) === 2 || Number(item.order?.status) === 2;
}
